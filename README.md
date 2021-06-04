# word-api

An API for retrieving and saving words to build a 'word of day' application.

It's also a learning project for various technologies like nodejs, express and mongoose deployment.

## Documentation
The API is documented with swagger/openapi. The resources will automatically mount on startup.

* Integrated swagger UI: `http://localhost:8000/`.
* Openapi.yaml: `http://localhost:8000/doc/openapi.yaml`
* Swagger.yaml: `http://localhost:8000/doc/swagger.yaml`
* Openapi.json: `http://localhost:8000/doc/openapi.json`
* Swagger.json: `http://localhost:8000/doc/swagger.json`

## Application env file
Create an .env file in `src/config` for defining the application properties

Example:
```dotenv
# Example .env file for the application
NODE_ENV=development
PORT=8000
# MongoDB
MONGO_DB_USER=<your-mongo-db-user>
MONGO_DB_PASSWORD=<your-mongo-db-password>
MONGO_DB_HOST=<your mongo-db-host>
MONGO_DB_PORT=<your-mongo-db-port>
MONGO_DB_NAME=<your-mongo-db-name>
# Security
API_KEY=<your-api-key>
```
The `.env.example` file is located at `src/config`.

## MongoDB connection
You have to insert your mongoDB connection to the env file. You can use a hosted MongoDB from [mLab](https://mlab.com/) or host it yourself with provided docker-compose script.
If you want to use the docker-compose script, you also have to add an .env file in the mongoDB folder.

Example:
```dotenv
# Example .env file for locally hosted MongoDB
MONGO_DATABASE_NAME=<your-database-name>
MONGO_DATABASE_USER=<your database-user>
MONGO_PASS=<your-password>
MONGO_ROOT_PASS=<your-root-password>
```
The `.env.example` file is located in the mongoDB folder.

## Project setup
```
npm install
```

### Run tests
Warning: First run can be really slowly
```
npm run test
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Fix all code formatting
```
npm run lint
```

## Inspiration
Used various sources to gather the knowledge. I listed some of them to provide you some background knowledge:
* [REST-API](https://medium.com/@_platypus_/express-a-simple-rest-api-9d82488e829f)
* [Environment Variables](https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786)
* [Testing](https://www.youtube.com/watch?v=7VNgjfmv_fE&ab_channel=KrisFoster)
* [Authorization](https://stoplight.io/blog/api-keys-best-practices-to-authenticate-apis/)
