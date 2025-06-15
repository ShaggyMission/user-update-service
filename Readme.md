# ✏️ User Profile Update Service - Shaggy Mission

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white" alt="Sequelize" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</div>

<div align="center">
  <h3>🚀 Secure Profile Management Microservice for Pet Rescue Platform</h3>
  <p><em>Part of the Shaggy Mission ecosystem - Keeping hero profiles updated for better rescue coordination! 🐾</em></p>
</div>

---

## 🌟 Overview

The **User Profile Update Service** is a secure profile management microservice in the Shaggy Mission platform that handles user information updates. This service ensures that volunteers, adopters, veterinarians, and administrators can maintain current contact information and personal details for effective rescue mission coordination.

## 🎯 What This Service Does

- **Secure Profile Updates**: Modifies user information with JWT authentication protection
- **Partial Updates Support**: Allows updating individual fields without affecting others
- **Authentication Middleware**: Protects endpoints with JWT token verification
- **Data Validation**: Ensures data integrity during profile modifications
- **Cookie-Based Authentication**: Validates user sessions through secure HTTP-only cookies
- **Flexible Field Updates**: Supports updating firstName, lastName, email, and phone independently

## 🛠️ Tech Stack

- **Runtime**: Node.js with Express.js framework
- **Authentication**: JWT (JSON Web Tokens) for secure access control
- **Database**: PostgreSQL with Sequelize ORM
- **Security**: JWT middleware for endpoint protection
- **Cookies**: HTTP-only cookie authentication
- **Documentation**: Swagger UI integration
- **Middleware**: Custom authentication layer for request validation

## 📡 API Endpoints

### User Profile Update Endpoint
**`PUT /users/profile/:id`**
- Updates user profile information securely
- Requires JWT authentication via cookies
- Supports partial updates (only provided fields are modified)
- Returns updated user profile data
- Protected by authentication middleware

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@newemail.com",
  "phone": "+1234567890"
}
```

### API Documentation Endpoint  
**`GET /users/updateUser-docs`**
- Interactive Swagger UI documentation
- Complete API specification and testing interface

```json
{
  "swagger": "2.0",
  "info": {
    "title": "User Update API",
    "version": "1.0.0"
  }
}
```

## 🔧 Core Functionality

### Profile Update Process
The service handles secure profile modifications by validating JWT tokens from HTTP-only cookies, verifying user existence in the database, applying partial updates to only the provided fields, maintaining existing data for unchanged fields, saving modifications to the database, and returning the updated profile information.

### Authentication Security
The service implements comprehensive security through JWT middleware that extracts tokens from secure cookies, validates token authenticity and expiration, decodes user information from tokens, and protects all update operations from unauthorized access.

### Flexible Update Logic
One of the key features is the intelligent partial update system that preserves existing user data when fields are not provided in the request, allowing users to update only specific information without affecting other profile details.

## 🌐 Service Integration

This microservice serves as the profile management component for the entire Shaggy Mission platform, working with the authentication system to ensure secure user data modifications. It enables volunteers and staff to keep their contact information current for effective rescue mission coordination.

## 🔒 Security Features

- **JWT Authentication**: All endpoints protected by token validation
- **Cookie Security**: Uses HTTP-only cookies for session management
- **User Verification**: Validates user existence before updates
- **Input Sanitization**: Processes only allowed profile fields
- **Error Handling**: Comprehensive error management for security scenarios

## 🗃️ Database Operations

The service performs secure database operations by finding users by primary key, applying conditional updates to preserve unchanged data, saving modifications with error handling, and returning sanitized user information without sensitive data like passwords.

---

<div align="center">
  <p><strong>Built with ❤️ for street dogs and cats everywhere 🐕🐱</strong></p>
  <p><em>Every profile update helps us coordinate rescue missions better!</em></p>
</div>