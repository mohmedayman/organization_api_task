# organization_api
 
## Overview

The Organization API is a Node.js-based backend application that allows users to manage organizations and invite users to join them. This API provides functionality for user authentication and organization management, including creating, reading, updating, and deleting organizations.
## Features

- User authentication (signup, signin, refresh token).
- CRUD operations for organizations.
- Invite users to organizations via email.
- Token-based authorization using JWT.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user and organization data.
- **Mongoose**: ODM for MongoDB and Node.js.
- **JWT**: JSON Web Tokens for authentication and authorization.
- **Docker**: Containerization platform for deployment.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed.
- MongoDB installed or a MongoDB Atlas account.
- Docker and Docker Compose (if using Docker).
-  If using Docker, build and run the application:
  docker-compose up
-ensure to run docker inside server directory
