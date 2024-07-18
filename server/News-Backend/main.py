from flask import Flask, jsonify, request
import requests
import os
import random
from datetime import datetime, timedelta
from text_summarizer import FrequencySummarizer
from bs4 import BeautifulSoup
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai 
from firebase_admin import credentials, auth, firestore
import firebase_admin



load_dotenv()

app = Flask(__name__)
CORS(app)

NEWS_API_KEY = os.getenv('NEWS_API_KEY')
SUMMARIZER_API_URL = os.getenv('SUMMARIZER_API_URL')
HF_TOKEN = os.getenv('HF_TOKEN')
NEWS_API_URL = 'https://newsapi.org/v2/everything'
headers = {"Authorization": f"Bearer {HF_TOKEN}", "Content-Type": "application/json"}
PROMPT = "You are a financial news writer. Summarize the given text in 150 words. Be smart as a computer and ignore the irrelevatn notations such as '\\n' or @ or copyrights etc."
GEMINI_API_KEY=os.getenv('GEMINI_API_KEY')

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-pro')


print(f"SUMMARIZER_API_URL: {SUMMARIZER_API_URL}")
print(f"HF_TOKEN: {HF_TOKEN}")

@app.route('/news', methods=['GET'])
def get_news():
    query = 'finance OR stocks OR investment OR economy OR trading OR economics OR bussiness OR personal finance'
    end_date = datetime.now()
    start_date = end_date - timedelta(days=15)
    domains = 'bbc.co.uk,moneycontrol.com,investopedia.com,cnbc.com,bloomberg.com,economictimes.indiatimes.com,finance.yahoo.com'

    params = {
        'q': query,
        'from': start_date.strftime('%Y-%m-%d'),
        'to': end_date.strftime('%Y-%m-%d'),
        'sortBy': 'popularity',
        'apiKey': NEWS_API_KEY,
        'pageSize': 15,  # Get the top 10 news articles
        'domains': domains,
    }

    response = requests.get(NEWS_API_URL, params=params)
    if response.status_code == 200:
        news_articles = response.json().get('articles', [])
        # random_10_articles = random.sample(news_articles, 10)  # Selecting 10 random articles
        return jsonify(news_articles)
    else:
        return jsonify({'error': 'Failed to fetch news'}), response.status_code

@app.route('/summarize', methods=['POST'])
def summarize_news_route():
    data = request.get_json()
    news_url = data.get('url')
    if not news_url:
        return jsonify({'error': 'URL is required'}), 400
    
    try:
        summary, sentiment = summarize_news(news_url)
        return jsonify({'summary': summary, 'sentiment': sentiment})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def query(payload, model_name):
    ''' 
    Function to query the model API
    POST Request to the API_URL with the payload and headers
    '''
    url = f"{SUMMARIZER_API_URL}/{model_name}"  # Construct the full URL
    # print(f"Querying API: {url}")
    # print(f"Headers: {headers}")
    # print(f"Payload: {payload}")

    response = requests.post(url, headers=headers, json=payload)
    if response.status_code != 200:
        print(f"Error: {response.status_code} - {response.text}")
        response.raise_for_status()
    return response.json()

def extract_max_label(response):
    if not response or not isinstance(response, list):
        return None

    max_score = -1
    max_label = None

    for item in response[0]:  # Assuming response is a list containing one dictionary
        score = item.get('score', 0)
        if score > max_score:
            max_score = score
            max_label = item.get('label')

    return max_label

def getTextFromURL(url):
	r = requests.get(url)
	soup = BeautifulSoup(r.text, "html.parser")
	text = ' '.join(map(lambda p: p.text, soup.find_all('p')))
	return text

def summarizeURL(url, total_pars):
	url_text = getTextFromURL(url).replace(u"Â", u"").replace(u"â", u"")
	fs = FrequencySummarizer()
	final_summary = fs.summarize(url_text.replace("\n"," "), total_pars)
	return " ".join(final_summary)
    

def summarize_news(news_url):
    ''' 
    Function to fetch and summarize news from a given URL
    '''
    response = summarizeURL(news_url, 10)
    # print("\n\n\n\n"+response+"\n\n\n\n")
    # payload = {
    #     "inputs": PROMPT+response+"\n\n\n",
    #     "max_length": 150
    # }
    # summary_response = query(payload,model_name="microsoft/Phi-3-mini-4k-instruct")
    # summary = summary_response[0]['generated_text']
    summary = model.generate_content(response+PROMPT)
    summary = summary.text

    # Sentiment analysis task specific to FinBERT
    sentiment_payload = {
        "inputs": str(response),
        "parameters": {
            "truncation": True
        }
    }
    sentiment_response = query(sentiment_payload, model_name="ProsusAI/finbert")
    sentiment = extract_max_label(sentiment_response)
    return summary, sentiment

@app.route('/test', methods=['GET'])
def test():
    response = summarize_news("https://www.bbc.co.uk/programmes/p0j8l7f4")
    return jsonify(response)
# Initialize the Firebase Admin SDK
cred = credentials.Certificate("./credentials.json")
firebase_admin.initialize_app(cred)

# Initialize Firestore
db = firestore.client()

def fetch_user_profile(user_id):
    profiles_ref = db.collection('profiles')
    user_doc = profiles_ref.document(user_id).get()
    if user_doc.exists:
        return user_doc.to_dict()
    else:
        print(f"No profile found for user ID: {user_id}")
        return None

def leaderboard():
    leaderboard_ref = db.collection('rewards')
    leaderboard_data = leaderboard_ref.order_by('score', direction=firestore.Query.DESCENDING).limit(10).stream()
    leaderboard = []
    for doc in leaderboard_data:
        leaderboard_entry = doc.to_dict()
        user_id = leaderboard_entry.get('user_id')
        user_profile = fetch_user_profile(user_id)
        if user_profile:
            leaderboard_entry['full_name'] = user_profile.get('full_name', 'N/A')
        else:
            leaderboard_entry['full_name'] = 'N/A'
        leaderboard.append(leaderboard_entry)
    return leaderboard

@app.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    try:
        # Fetch leaderboard data
        leaderboard_data = leaderboard()

        # Prepare JSON response
        leaderboard_json = jsonify({
            'leaderboard': leaderboard_data
        })

        return leaderboard_json, 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
