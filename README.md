# Welcome to disCHORD!

## About

Our app, disCHORD, aims to connect people across the globe through the power of music. The app allows you to search an artist or title, links to Spotify for listening to music with friends, and offers a chat feature for texting while listening!

Originally developed for UCLA's CS35L course

Contributors: Mateus Behrend, Kyle DeVeaux, Ashton Jin, Sananshi Pidyar, Arka Sharma.

## Features

Here’s a brief list of disCHORD’s most notable features:

Authenticated Login: Authenticate users for secure access to the app.

Search Using Keyword: Users can search for an artist or track title, and the app will return recommendations

Music: disCHORD includes a feature that links tracks to Spotify, so users can listen to the track there.

Chat: Users can search for users by username and chat with each other.

iFrame: A fun feature where you can type in a song name, and the search will return similar songs and a confidence level.

## Installation
TODO: Add API Key instructions here, along with Spotify Client ID (no keys in README) and general instructions on how to run the startup script. 
```
  #Clone the repository and enter it
git clone https://github.com/arkasharma/disCHORD
cd disCHORD
```

## Running

```
  #Install dependencies
npm install
  #Install JSON server
npm install json-server
  #Start JSON Server
json-server --watch loginInfo/loginDb.json --port 8000
#Start the application
  npm start
```

# NoteWorthy 

Added to disCHORD using iFrame
Separate repo and README for NoteWorthy 
Added to disCHORD using iFrame and has separate repo & README 
https://github.com/sananshi474/noteworthy.git
