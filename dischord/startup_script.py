#!/usr/bin/env python3
#start up script for the application
import os
import sys
import subprocess

#install npm packages needed
os.system("npm install")


# Prompt the user for API keys
# Save this input to the environment variables
spotify_client_ID = input("Enter your spotify client ID: ")
spotify_client_secret = input("Enter your spotify client secret: ")

firebase_project_id = input("Enter your firebase project ID: ")

# combine the input with the environment variables
# write to .env file
if not os.path.exists('.env'):
    spotify_client_ID = input("Enter your spotify client ID: ")
    spotify_client_secret = input("Enter your spotify client secret: ")
    firebase_api_key = input("Enter your firebase API key: ")
    with open('.env', 'w') as f:
        f.write(f'REACT_APP_FIREBASE_API_KEY={firebase_api_key}\n')
        f.write(f'REACT_APP_SPOTIFY_CLIENT_ID={spotify_client_ID}\n')
        f.write(f'REACT_APP_SPOTIFY_CLIENT_SECRET={spotify_client_secret}\n')

else:
    skip_prompt = input(".env file already exists. Do you want to skip writing to .env file? (y/n): ")
    if skip_prompt.lower() != 'y':
        spotify_client_ID = input("Enter your spotify client ID: ")
        spotify_client_secret = input("Enter your spotify client secret: ")
        firebase_api_key = input("Enter your firebase API key: ")
        with open('.env', 'w') as f:
            f.write(f'REACT_APP_FIREBASE_API_KEY={firebase_api_key}\n')
            f.write(f'REACT_APP_SPOTIFY_CLIENT_ID={spotify_client_ID}\n')
            f.write(f'REACT_APP_SPOTIFY_CLIENT_SECRET={spotify_client_secret}\n')
    if skip_prompt.lower() == 'y':
        current_dir = os.getcwd()

        # Specify the path to the .env file
        env_file_path = os.path.join(current_dir, '.env')

        # Read the .env file and extract environment variables
        env_var = {}
        with open(env_file_path, 'r') as f:
            for line in f:
                if line.strip() and not line.startswith('#'):
                    key, value = line.strip().split('=', 1)
                    env_var[key] = value

        # Access the value of an environment variable
        firebase_api_key = env_var.get("REACT_APP_FIREBASE_API_KEY")
        spotify_client_ID = env_var.get("REACT_APP_SPOTIFY_CLIENT_ID")
        spotify_client_secret = env_var.get("REACT_APP_SPOTIFY_CLIENT_SECRET")

firestore_rest_url = f"https://firestore.googleapis.com/v1/projects/dischord-f6bdb/databases/(default)/documents/api/6bLsW9olWQami2jxuGmx?key={firebase_api_key}"
response = requests.get(firestore_rest_url)
if response.status_code == 200:
        
        # Parse the JSON response
        document_data = response.json()

        # Get the value of the "key" field from the document data
        key_value = document_data.get("fields", {}).get("key", {}).get("stringValue")

        auth_domain = document_data.get("fields", {}).get("authDomain", {}).get("stringValue")
        project_id = document_data.get("fields", {}).get("projectId", {}).get("stringValue")
        app_id = document_data.get("fields", {}).get("appId", {}).get("stringValue")
        measurement_id = document_data.get("fields", {}).get("measurementId", {}).get("stringValue")
        storage_bucket = document_data.get("fields", {}).get("storageBucket", {}).get("stringValue")
        messaging_sender_id = document_data.get("fields", {}).get("messagingSenderId", {}).get("stringValue")

        # Compare the retrieved key value with the firebase_api_key
        if key_value == firebase_api_key:

            with open('.env', 'w') as f:
                f.write(f'REACT_APP_FIREBASE_API_KEY={key_value}\n')
                f.write(f'REACT_APP_AUTH_DOMAIN={auth_domain}\n')
                f.write(f'REACT_APP_PROJECT_ID={project_id}\n')
                f.write(f'REACT_APP_APP_ID={app_id}\n')
                f.write(f'REACT_APP_MEASUREMENT_ID={measurement_id}\n')
                f.write(f'REACT_APP_STORAGE_BUCKET={storage_bucket}\n')
                f.write(f'REACT_APP_MESSAGING_SENDER_ID={messaging_sender_id}\n')
                f.write(f'REACT_APP_SPOTIFY_CLIENT_ID={spotify_client_ID}\n')
                f.write(f'REACT_APP_SPOTIFY_CLIENT_SECRET={spotify_client_secret}\n')

            # Start the first process
            p1 = subprocess.Popen("npm start", shell=True)

            # Start the second process
            p2 = subprocess.Popen("json-server --watch loginInfo/loginDb.json --port 8000", shell=True)

            try:
                # Wait for them to complete
                p1.wait()
                p2.wait()

            except KeyboardInterrupt:
                # If KeyboardInterrupt (i.e. Ctrl+C) is detected, kill them
                p1.terminate()
                p2.terminate()
                print("Both processes have been terminated.")

