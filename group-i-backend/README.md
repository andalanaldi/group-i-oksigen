# group-i-backend
Backend repository for group-i

[Backend App is Deployed here](https://group-i-backend-floral-haze-8477.fly.dev)

# Express Application (app.js)

Purpose:
The JavaScript code in **app.js** is an Express application that sets up various routes, middleware for authentication and authorization, and a scheduled task (using **node-cron**) for checking transactions. It also listens on a specified port for incoming requests.

Usage:
1. **Installation:** Ensure you have Node.js installed.
2. **Environment Setup:** Set up environment variables like **PORT, DATABASE_URL, ENABLE_CRON,** and **INTERVAL_INQUIRY**.
3. **Dependencies:** Install required npm packages **(express, cors, node-cron**, etc.).
4. **Start Application:** Run the app using **node app.js**.

Code Explanation:
- It imports necessary modules like **express, cors**, and routes (**authRouter, serviceuserRouter**, etc.).
- Defines middleware for handling JSON parsing and CORS.
- Sets up various routes with associated middleware for authorization.
- Utilizes **node-cron** to periodically execute a function (**checkTransactionRoutine**) based on a configured interval if **ENABLE_CRON** is set to **true**.
- Finally, it starts the server on a specified port (default: 3000).

# Middleware and Routes Explanation:
1. **app.use('/auth', authRouter)**
- **Purpose**: This line sets up a middleware for handling routes related to authentication. Any requests starting with **/auth** will be directed to the **authRouter**.
- **Usage**: It's typically used for user authentication-related functionalities like login, registration, etc.
- **Example**: If a request is made to **/auth/login**, it will be handled by the **authRouter** specified elsewhere in the code.
2. **app.use(authenticationMiddleware)**
- **Purpose**: This line uses a custom middleware (**authenticationMiddleware**) to handle authentication for all routes defined after this middleware.
- **Usage**: It's intended to validate and authenticate incoming requests before they reach further route handling.
- **Example**: Any request that reaches this middleware is checked for valid authentication tokens or credentials before proceeding to other routes.
3. **app.use('/', authorizationUser, serviceuserRouter)**
- **Purpose**: Routes starting from the root URL / are handled by this middleware chain. It includes authorization for users (**authorizationUser**) and routes specified in **serviceuserRouter**.
- **Usage**: It's used to protect and manage routes accessible to authenticated users, typically for user-specific functionalities.
- **Example**: Requests to URLs like **/profile**, **/dashboard**, etc., after authentication, are handled by **serviceuserRouter**.
4. **app.use('/superadmin', authorizationSuperAdmin, servicesuperadminRouter)**
- **Purpose**: Similar to the previous one, but specifically for superadmin-related functionalities.
- **Usage**: Restricts access to routes starting with **/superadmin** to users with superadmin privileges.
- **Example**: Routes like **/superadmin/dashboard, /superadmin/settings**, etc., are handled by **servicesuperadminRouter** but only accessible to superadmins.
5. **app.use("/transaction", authorizationUser, transactionRoutes)**
- **Purpose**: Handles routes related to transactions, applying user authorization (**authorizationUser**) before processing requests through **transactionRoutes**.
- **Usage**: Controls access to transaction-related endpoints based on user authorization.
- **Example**: Requests to endpoints like **/transaction/history**, **/transaction/new**, etc., are handled by **transactionRoutes** but only accessible to authorized users.
6. **if (ENABLE_CRON == "true") { ... }**
- **Purpose**: Conditionally schedules a task using **node-cron** if the **ENABLE_CRON** configuration variable is set to **"true"**.
- **Usage**: It schedules the **checkTransactionRoutine** function at specified intervals for transaction-related checks, possibly for recurring tasks like data updates or validations.
- **Example**: If **ENABLE_CRON** is set to **"true"** in the environment, the **checkTransactionRoutine** function will be executed periodically based on the configured **INTERVAL_INQUIRY**.

These middleware and route setups help in organizing and managing different aspects of the application, such as authentication, authorization, routing for various user roles and functionalities and services or controllers such as transactions for instance.

# PostgreSQL Schema (Prisma)

Purpose:
The Prisma schema defines the structure of your PostgreSQL database using models and their relationships. It specifies tables, fields, data types, and relations between various entities.

Usage:
1. **Setup Database**: Ensure you have PostgreSQL installed or you have PostgreSQL connection in Supabase and create a database based on the configuration.
2. **Prisma ORM**: Use Prisma CLI to generate a Prisma client for database interactions. Some commands are :

Generate database
```
npx prisma generate
```
3. **Migrations**: Apply migrations to synchronize the database with the defined schema.
Syncronize database with POstgreSQL connection in Supabase
```
npx prisma db push
```
Migrate
```
npx prisma migrate
```
Create a UI for database schemas or tables 
```
npx prisma studio
```

Schema Explanation:
- **user Model**: Represents users with various fields like **id, organization_name, organization_email,** etc. Also has a relationship (**transactions**) with the **transaction** model.
- **role Enum**: Defines two roles which are **user** and **superadmin**.
- **polution Model**: Represents pollution data in cities with fields like **id, cityId, polution, caseRespiratory, costRespiratory**, etc. Has a relationship (**location**) with the **location** model.
- **location Model**: Represents city locations with fields like **id, cityName, cityLat, cityLon**, etc. Relates to **polution**.
- **transaction Model**: Represents transaction data with fields like **id, createdAt, updatedAt**, etc. Relates to **user**.

# Instructions:
1. **Express Application**:
- Clone the repository.
- Set up environment variables (e.g., **DATABASE_URL, ENABLE_CRON**, etc.).
- Install dependencies (**npm install**).
- Run the application (**node app.js**).

2. **PostgreSQL Setup (Prisma)**:
- Install PostgreSQL.
- Create a database.
- Configure the database URL in the **.env** file or as an environment variable.
- Run Prisma migrations.
```
npx prisma migrate
```

Remember to replace placeholders like **DATABASE_URL, PORT**, and environment-specific configurations with actual values relevant to your setup.

This documentation should serve as a guide for anyone wanting to understand, set up, and use your Express application along with the PostgreSQL database defined using Prisma. Adjust it based on your specific project requirements and add any additional details or instructions as necessary.

# Backend Technologies Used:

Core Backend Framework and Dependencies:
- **Express.js (express)**: A popular Node.js framework for building web applications and APIs.
- **Node.js (nodemon)**: Used for auto-restarting the server during development.
- **CORS (cors)**: Enables Cross-Origin Resource Sharing for handling requests from different origins.

Database Related:
- **Prisma ORM (@prisma/client, prisma)**: An ORM (Object-Relational Mapping) tool for interfacing with databases, specifically used in this backend *Oksigen* project with PostgreSQL.

Authentication and Security:
- **JWT (jsonwebtoken)**: Used for generating and validating JSON Web Tokens for authentication.
- **Bcrypt and BcryptJS (bcrypt, bcryptjs)**: Libraries for hashing passwords securely.

Request Handling and Middleware:
- **Body Parser (body-parser)**: Parses incoming request bodies in middleware.
- **Cookie Parser (cookie-parser)**: Parses cookies attached to the client's request.
- **Express Validator (express-validator)**: Middleware for validating and sanitizing incoming request data.
- **Express Async Handler (express-async-handler)**: Simplifies error handling in Express routes when using asynchronous functions.

Additional Dependencies:
- **Axios (axios)**: Used for making HTTP requests.
- **Node-Cron (node-cron)**: Used for scheduling cron jobs within Node.js applications.
- **dotenv (dotenv)**: Loads environment variables from a .env file into process.env.

Development Dependencies:
- **Prisma CLI (prisma)**: Development tool for managing database migrations and generating Prisma client.

These technologies collectively enable building a RESTful API with Express, handling authentication, database operations using Prisma with PostgreSQL, managing middleware for request handling, and scheduling background tasks using cron jobs within the Node.js application.

# References for Used Data in This Project

Air Quality Index

https://support.iqair.com/en/articles/4939698-how-can-i-access-historical-data-on-the-iqair-platform

https://www.iqair.com/newsroom/what-is-aqi

BPJS Dummy Sample Data

https://e-ppid.bpjs-kesehatan.go.id/eppid/

# API Documentation

https://documenter.getpostman.com/view/29042682/2s9YkraKDV
