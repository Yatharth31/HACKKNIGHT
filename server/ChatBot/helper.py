from flask import Flask, jsonify, request
from flask_cors import CORS
import yfinance as yf
import os
import requests
from dotenv import load_dotenv, get_key

load_dotenv()

app = Flask(__name__)
CORS(app)

# Set the Hugging Face Hub API token from the environment variable
os.environ["HUGGINGFACEHUB_API_TOKEN"] = get_key(key_to_get="HUGGINGFACEHUB_API_KEY", dotenv_path=".env")

# Get the inference API endpoint URL from the environment variable
INFERENCE_API_URL = os.getenv("INFERENCE_API_URL")

def get_hist_data(symbol):
    stock = yf.Ticker(symbol)
    hist = stock.history(period="1y")
    # Reset index to get the Date as a column
    hist.reset_index(inplace=True)
    # Convert Date to string format to ensure JSON serializable
    hist['Date'] = hist['Date'].dt.strftime('%Y-%m-%d')
    return hist.to_json(orient='records')

@app.route('/get_historical_data', methods=['GET'])
def get_historical_data():
    symbol = request.args.get('symbol')
    if symbol is None:
        return jsonify({"error": "Symbol parameter is missing"}), 400
    try:
        historical_data = get_hist_data(symbol)
        return historical_data
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def chatwithbot(txt: str):
    try:
        payload = {
            "inputs": txt,
            "parameters": {
                "max_new_tokens": 512,
                "top_k": 30,
                "temperature": 0.3,
                "repetition_penalty": 1.03,
            }
        }
        headers = {
            "Authorization": f"Bearer {os.getenv('HUGGINGFACEHUB_API_TOKEN')}",
            "Content-Type": "application/json"
        }
        response = requests.post(INFERENCE_API_URL, json=payload, headers=headers)
        response.raise_for_status()  # Raise an error for bad status codes
        
        # Print the response for debugging
        print("API Response:", response.json())

        res_json = response.json()
        
        # Check if response is a list
        if isinstance(res_json, list) and len(res_json) > 0 and isinstance(res_json[0], dict):
            res = res_json[0].get("generated_text", "")
        elif isinstance(res_json, dict):
            res = res_json.get("generated_text", "")
        else:
            res = ""
        
        return res
    except Exception as e:
        print(f"Error: {e}")
        return str(e)

@app.route('/chat', methods=["GET", "POST"])
def chat():
    if request.method == 'POST':
        try:
            data = request.get_json()
            txt = data['text']
            res = chatwithbot(txt)
            res = str(res)
            last_inst_index = res.rfind("[/INST]")
            if last_inst_index != -1:
                res = res[last_inst_index + len("[/INST]"):].strip()
            return jsonify({"response": res})
        except Exception as e:
            print(f"Error in chat endpoint: {e}")
            return jsonify({"error": str(e)})
    else:
        return jsonify({"error": "GET method not supported for chat endpoint"}), 405

if __name__ == '__main__':
    app.run(debug=True)
