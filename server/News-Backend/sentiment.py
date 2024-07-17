import requests, os
from dotenv import load_dotenv
from bs4 import BeautifulSoup

load_dotenv()

HF_TOKEN = str(os.getenv("HF_TOKEN"))

API_URL = "https://api-inference.huggingface.co/models/ProsusAI/finbert"
headers = {"Authorization": f"Bearer {HF_TOKEN}", "Content-Type": "application/json"}

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()
	
news_url = "https://www.bbc.co.uk/programmes/p0j8l7f4"
response = requests.get(news_url)
soup = BeautifulSoup(response.content, 'html.parser')
paragraphs = soup.find_all('p')
news_text = ' '.join([para.text for para in paragraphs])

output = query({
	"inputs": news_text,
})
print(output)