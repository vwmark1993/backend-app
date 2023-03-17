## Backend App

#### Requirements
This project requires Node.js and MongoDB to be installed on your local machine. Additionally, MongoDB must be configured to be listening on the following port: `127.0.0.1:27017`.

#### Setup
1. Run `npm i` to install dependencies.
2. Run `npm run devStart` to initialize the project. If successful, the project should be running locally on PORT 3000.
3. The console should indicate the server is listening on PORT 3000, the connection to MongoDB has been established and the database has been populated.
4. Sample API endpoints have been provided in the `route.http` file. In order to use them in VS Code, the `REST Client` extension is required.
5. If necessary, custom environment variables for the `PORT` number and `DATABASE_URL` connection may be used by adding a `.env` file to the root project folder.
