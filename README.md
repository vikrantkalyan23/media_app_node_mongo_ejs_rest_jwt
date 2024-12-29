# media_app_node_mongo_ejs_rest_jwt

Media App Front-end and Admin Panel Using Node.js, MongoDB, EJS Template, RESTAPIs and JWT with Open Weather API

# Steps

npm init -y

npm install express mongoose dotenv ejs body-parser jsonwebtoken bcryptjs nodemon

npm install --save-dev eslint prettier

npm install nodemailer

npm install axios

npm install bcrypt

npm install cookie-parser

npm install socket.io

npm install express-session

docker build -t media_app_node_mongo_ejs_rest_jwt .

docker run -d -p 3500:3500 --name media_app_node_mongo_ejs_rest_jwt media_app_node_mongo_ejs_rest_jwt

# API Endpoint

http://localhost:3500/

Admin Panel

http://localhost:3500/admin

# Tag the image for Docker Hub

docker tag media_app_node_mongo_ejs_rest_jwt your-dockerhub-username/media_app_node_mongo_ejs_rest_jwt:latest

# Push the image

docker push your-dockerhub-username/media_app_node_mongo_ejs_rest_jwt:latest

# Docker Hub repository URL

https://hub.docker.com/r/vikrantkalyan23/media_app_node_mongo_ejs_rest_jwt
