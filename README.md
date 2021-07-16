# Setup App

[Front-end Live demo](https://kanda-fullstack.surge.sh/)

## Client

```sh
cd client
npm install && npm start

# Open and Test React front-end on http://localhost:3000/
```

## Server

```sh
# create and activate python env
python3 -m venv ~/kandaenv
source ~/kandaenv/bin/activate

# install server packages
cd server
pip3 install -r requirements.txt

# start falcon API on http://localhost:8000/
python3 server.py

# run unit tests
pytest tests
```
