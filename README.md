# Expense Manager

This is a MERN stack application that allows users to manage their personal expenses. Users can add, edit, delete, and view their expenses. The application uses JWT-based authentication for user access and DynamoDB for storing expenses.

## Table of Contents

- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Technologies Used](#technologies-used)

## Installation

### Backend

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/expense-manager.git
   cd expense-manager/backend
   ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up your environment variables by creating a `.env` file in the backend directory. Refer to the Environment Variables section for required variables.

4. Start the backend server:

    ```bash
    npm start
    ```

### frontend

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/expense-manager.git
   cd expense-manager/frontend
   ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the backend server:

    ```bash
    npm start
    ```

## Environment Variables

- Create a .env file in the backend directory and add the following variables:

    ```bash
    PORT=7000
    JWT_SECRET=your_jwt_secret
    AWS_ACCESS_KEY_ID=your_aws_access_key
    AWS_SECRET_ACCESS_KEY=your_aws_secret_key
    AWS_REGION=your_aws_region
    ```

## Technologies Used
- Frontend: React.js, Bootstrap, Axios
- Backend: Node.js, Express.js, JWT, MongoDB, DynamoDB
- Database: DynamoDB
- Authentication: JWT (JSON Web Token)
- Hosting: AWS 

You can access our application hosted in AWS :

    http://13.201.66.28/3000/extenses
