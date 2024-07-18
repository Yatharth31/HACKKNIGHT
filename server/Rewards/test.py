import firebase_admin
from firebase_admin import credentials, auth, firestore
from flask import Flask, request, jsonify

app = Flask(__name__)

# Initialize the Firebase Admin SDK
cred = credentials.Certificate("./credentials.json")
firebase_admin.initialize_app(cred)

# Initialize Firestore
db = firestore.client()

def get_all_users():
    users = []
    page = auth.list_users()
    while page:
        for user in page.users:
            users.append(user)
        page = page.get_next_page()
    return users

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

def get_user_rank(user_id):
    rewards_ref = db.collection('rewards')
    all_users_data = rewards_ref.order_by('score', direction=firestore.Query.DESCENDING).stream()
    rank = 0
    for doc in all_users_data:
        rank += 1
        doc_data = doc.to_dict()
        if doc_data.get('user_id') == user_id:
            return rank
    return None  # User not found in the leaderboard

@app.route('/getUser', methods=['POST'])
def get_user():
    id_token = request.headers.get('Authorization').split('Bearer ')[1]
    print(f"\n\n\n\n\nID Token: {id_token}"+"\n\n\n\n")
    try:
        decoded_token = auth.verify_id_token(id_token)
        user_id = decoded_token['uid']
        user_email = decoded_token['email']

        # Fetch and print the leaderboard
        leaderboard_data = leaderboard()
        for index, entry in enumerate(leaderboard_data):
            print(f"{index + 1}. {entry['full_name']} - {entry['score']}")

        user_rank = get_user_rank(user_id)
        if user_rank:
            return jsonify({
                'email': user_email,
                'rank': user_rank
            }), 200
        else:
            return jsonify({
                'email': user_email,
                'rank': 'Not found in the leaderboard'
            }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)