# HR Management Dashboard - Backend

## Overview

This repository contains the backend code for the HR Management Dashboard, a comprehensive web application for managing HR activities 
such as employee management, attendance tracking, leave requests, recruitment, and more. 
The backend is built using Node.js, Express.js, and MongoDB, providing RESTful API endpoints for the frontend to interact with.

## Features

- **Employee Management**: Create, read, update, and delete (CRUD) employee records.
- **Attendance Management**: Record and retrieve employee attendance.
- **Leave Management**: Handle leave requests and approvals.
- **Recruitment**: Manage job postings, candidate applications, and interview schedules.
- **Authentication**: Secure login and registration with JWT authentication.
- **Role-Based Access Control**: Different roles with specific permissions (e.g., Admin, HR, Employee).
- **Data Validation**: Ensure data integrity using Mongoose schemas and validation.
- **Error Handling**: Centralized error handling with proper HTTP status codes.

## Tech Stack

- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens), bcrypt for password hashing
- **API Documentation**: Postman or Swagger (Specify if used)
- **Environment Variables**: Managed with dotenv

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:

   git clone https://github.com/J-Saisaran/HR_Management-Backend.git
   cd HR_Management-Backend
