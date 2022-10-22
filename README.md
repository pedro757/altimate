# Altimate
take-home exercise

## Instructions

1. Clone the repo
1. Run `cd web && yarn install && yarn dev`
1. Run `cd server && poetry install && uvicorn server:app --reload`
1. Open `https://127.0.0.1:3000`

## Important Note

When ask for the database name you should type `example.db` otherwise it will not show anything because I only created one database with sqlite.


## Improvements I would make

1. Currently when we reload the page we lose the state, so I would find a way to persist data with the libraries I'm using (react-query, jotai).
1. Better UI/UX, responsive design etc..
