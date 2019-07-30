# Chatterbox
This is a socket based chat application written in Django and React.

# Prerequisites

- [Docker](https://docs.docker.com/v17.12/install/)

# Initialize the project

Start the dev server for local development, it would automatically provide posgreasql, redis and build frontend and do the migrations in the backend code and run a functional chat system.

```bash
docker-compose up
```

Wait to docker build up database and code containers, then open following address in your browser:
[http://localhost:8000](http://localhost:8000)

# Testing the project

To run tests for http and websocket endpoints run following command:

```bash
docker-compose run --rm backend ./manage.py test
```