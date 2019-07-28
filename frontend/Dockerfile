FROM node:12

# Adds our application code to the image
COPY ./frontend /frontend/
WORKDIR /frontend

# Allows docker to cache installed dependencies between builds
RUN npm install

# Migrates the database, uploads staticfiles, and runs the production server
CMD npm run build && \
    npm run export
