
# Bank statement generator

## Introduction
This bank statement generator application allows users to view their transactions within a given date range. The transactions are accessible through user email. User can download the pdf and also request the pdf through email.

## Pre-requisites

- **Software & Libraries**:
  - Node.js & npm
  - MongoDB
  - ReactJs
  - Nodemailer
  - Bootstrap

## Setup & Installation

### 1. Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install necessary packages
npm install

# Start the React development server
npm start

```

### 2. Backend Setup

```bash
# Install necessary packages in root directory
npm install

# Set environment variables (Create a .env file and add following)
PORT=8000
MONGO_URI=your-mongodb-uri
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_MAIL='your-email'
SMTP_PASSWORD=service-password

# Start the server (ensure MongoDB is running)
npm start

```

## Usage
- Enter your details in the form.
- The transactions associated with the email and within the given date range will show up.
- View, download or get the pdf of transactions through email.

## Authentication and Authorization
Implementing authentication and authorization is easy in this webapp. We will have to add a collection called 'Users' in mongodb database which will consist of user information like email, name and passwords. We will add login and register screens in frontend and the statements screen will become a protected route(it cannot be opened without authorized access). The passwords will be stored in hashed form in database which can be done through libraries like bcrypt. The user details will be matched from data in 'Users' collection. When a user logs in correctly, then we will store the authentication details in local storage and allow him to access all the transactions with the associated email.

## Contributors
- [Saksham Negi](https://www.linkedin.com/in/sakshamian/)