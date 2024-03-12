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

firebase_api_key = input("Enter your firebase API key: ")

# combine the input with the environment variables
# write to .env file
with open('.env', 'w') as f:
    f.write(f'REACT_APP_SPOTIFY_CLIENT_ID={spotify_client_ID}\n')
    f.write(f'REACT_APP_SPOTIFY_CLIENT_SECRET={spotify_client_secret}\n')
    f.write(f'REACT_APP_FIREBASE_API_KEY={firebase_api_key}\n')

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

