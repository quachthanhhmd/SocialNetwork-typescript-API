# RESTful API Typescript server.

A project for quickly building RESTful APIs building a social network is used typescript, express, swagger, mysql, sequelize, socket,...

By running a single command, you will get a production-ready Typescript app installed and fully configured on your machine. The app comes with many built-in features, such as authentication using JWT, request validation, unit and integration tests, continuous integration, docker support, API documentation, pagination, etc. For more details, check the features list below.

## Manual Installation

If you would still prefer to do the installation manually, follow these steps:

Clone the repo:

```bash
git clone https://github.com/quachthanhhmd/SocialNetwork-typescript-API.git
```

Install the dependencies:

```bash
npm install
```
Install global packages to use typescript
```bash
npm install -D typescript
npm install -D ts-node
```
Moreover, you can use nodemon to automatically run our project:
```bash
npm install -D nodemon
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```    

## Table of Contents

- [Features](#features)
- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)

## Features
- **Framework**: [Express](https://expressjs.com/)
- **SQL database**: [MySQL](https://www.mysql.com)
- **ORM**: [Sequelize](https://sequelize.org/master)
- **Authentication and authorization**: using [passport](http://www.passportjs.org)
- **Socket**: using [Socket](https://socket.io)
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Password-hashing**: [Bcrypt](https://www.npmjs.com/package/bcrypt)
- **Mail**: [Nodemailer](https://nodemailer.com)
- **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- **Error handling**: centralized error handling mechanism
- **API documentation**: with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
- **Dependency management**: with [npm](https://www.npmjs.com/)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- **Santizing**: sanitize request data against xss and query injection
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)

## Commands

Running locally:

```bash
npm run dev
```

Running in production:

```bash
npm start
```

Building database:
  - Firstly, you need to create a schema that has a name as you declare in the .env file.
  - Secondly, run in your command:
    ```bash
    npm run db
    ```
    Or you can run:
    ```bash
    ts-node ./src/buildDB
    ```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=3000

# DB set up
DB_USERNAME=typeyourusername
DB_PASSWORD=typeyourpassword
DB_DATABASE_NAME=typeyourdatabasename
DB_DATABASE_PORT=typeyourportofdb
DB_DIALECT=mysql

# JWT
# JWT secret key
JWT_SECRET=thisisasamplesecret
# Number of minutes after which an access token expires
JWT_ACCESS_EXPIRATION_MINUTES=30
# Number of days after which a refresh token expires
JWT_REFRESH_EXPIRATION_DAYS=30

# SMTP configuration options for the email service
# For testing, you can use a fake SMTP service like Ethereal: https://ethereal.email/create
HOST=email-server
EMAIL_PORT=587
EMAIL_USERNAME=email-server-username
EMAIL_PASSWORD=email-server-password
# Cloudinary url
CLOUDINARY_URL=cloudinary://example
```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--constants\      # Constants API error and type
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--interfaces\     # Interface viewmodel
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.ts          # Express app
 |--buildDB.ts      # Config to build a mysql DB using sequlize.
 |--server.ts       # App entry point
 |--socket.ts       # Setup a socket server.
```
