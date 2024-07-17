import requests
from dotenv import load_dotenv
import os
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

def summarize_text(text_to_summarize, api_key):
    """Function to summarize text using Gemini API."""
    url = 'https://api.geminiapi.com/text-summarization/summarize'
    
    headers = {
        'Content-Type': 'application/json',
        'x-api-key': api_key  # Replace with your Gemini API key
    }
    
    payload = {
        'text': text_to_summarize
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        if response.status_code == 200:
            summary = response.json().get('summary', 'Summary not available')
            return summary
        else:
            print(f"Error: {response.status_code} - {response.text}")
            return None
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

# Example usage:
if __name__ == '__main__':
    text_to_summarize = """
    The dollar lost around 2% against the Japanese yen on Thursday as the market was suddenly jolted by fresh inflation U.S. data. 
    Some currency experts highlighted the U.S. data for the yen move, with Kit Juckes, global head of foreign exchange strategy at 
    Societe Generale, telling CNBC via email that the "driver of the yen rally is big shorts and a surprise in CPI." Japan last 
    intervened to stabilize the currency in October 2022, when the yen fell to lows of around 152 per U.S. dollar. The yen traded at 
    158.55 against the U.S. dollar at roughly 3 p.m. London time after trading nearer 161.52 earlier in the session. But it comes at 
    a time when traders are on high alert for more yen intervention from Japanese authorities as they try to prop up its ailing currency. 
    Marc Ostwald, a global strategist and chief economist at ADM Investor Services, said there was no concrete evidence for the intervention 
    but added that it looked like the broad dollar sell-off "triggered by U.S. CPI hit some stop loss target levels above all in JPY, 
    with a strong suspicion that the MoF [Ministry of Finance] may well have used the opportunity to intervene modestly." The yen had 
    plunged to a 34-year low of 160.03 against the U.S. dollar on April 29. The ministry stated at the time that Japan had spent 9.7885 
    trillion yen ($62.25 billion) on currency intervention between April 26 and May 29. Correction: This story has been updated with the 
    correct historical data for U.S. CPI and to accurately reflect the dollar movement after the report was released on Thursday. Authorities 
    intervened three times that year to stabilize the currency, reportedly spending as much as a combined 9.2 trillion yen over the period.
    """
    
    summary = summarize_text(text_to_summarize, api_key)
    if summary:
        print("Summary:")
        print(summary)
