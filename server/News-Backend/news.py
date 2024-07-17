from flask import Flask, jsonify
import requests
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

NEWS_API_KEY = os.getenv('NEWS_API_KEY')
NEWS_API_URL = 'https://newsapi.org/v2/everything'

@app.route('/news', methods=['GET'])
def get_news():
    query = 'finance'
    end_date = datetime.now()
    start_date = end_date - timedelta(days=15)
    domains = 'bbc.co.uk,investopedia.com,cnbc.com,bloomberg.com,economictimes.indiatimes.com,finance.yahoo.com'

    params = {
        'q': query,
        'from': start_date.strftime('%Y-%m-%d'),
        'to': end_date.strftime('%Y-%m-%d'),
        'sortBy': 'popularity',
        'apiKey': NEWS_API_KEY,
        'pageSize': 10,  # Get the top 10 news articles
        'domains': domains
    }

    response = requests.get(NEWS_API_URL, params=params)
    if response.status_code == 200:
        news = response.json().get('articles', [])
        return jsonify(news)
    else:
        return jsonify({'error': 'Failed to fetch news'}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)
