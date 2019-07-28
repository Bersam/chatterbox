FROM python:3
ENV PYTHONUNBUFFERED 1

# Allows docker to cache installed dependencies between builds
COPY ./requirements.in /requirements.in
RUN pip install -r /requirements.in

# Adds our application code to the image
COPY . /backend/
WORKDIR /backend

EXPOSE 8000

# Migrates the database, uploads staticfiles, and runs the production server
CMD ./manage.py migrate && \
    ./manage.py collectstatic --noinput && \
    ./manage.py runserver
