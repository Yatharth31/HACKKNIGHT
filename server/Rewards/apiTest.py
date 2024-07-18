import requests

url = 'http://localhost:5000/getUser'
id_token = 'AQbjH2sN3mWy2Sso2Loi1CWVwHs2'  # Replace with your actual ID token

headers = {
    'Authorization': f'Bearer {id_token}',
    'Content-Type': 'application/json'
}

response = requests.post(url, headers=headers)
print(response.json())
