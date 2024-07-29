# Book Management System

A Node.js and Express.js application for managing books with role-based authentication (Admin, Author, Reader), JWT authorization, CRUD operations, Cloudinary file uploads, and data validation using `express-validator`. Features include request logging and error handling.

## Features

- **Role-based Authentication & Authorization**:
  - **Admin**: Full access to all CRUD operations for books.
  - **Author**: Can create, update, and view books.
  - **Reader**: Can only view and read books.
- **Book Management**: Create, update, delete, and view books.
- **File Uploads**: Upload book cover pages to Cloudinary.
- **Validation**: Validate incoming request data with `express-validator`.
- **Request Logging**: Log incoming requests with method, URL, and timestamp.
- **Error Handling**: Handle errors gracefully with meaningful messages and status codes.

## Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/book-management-system.git
   cd book-management-system
2. Install dependencies:
   ```sh
   npm install
3. Create a .env file and add your configuration:
    ```sh
    PORT=3000
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret

4. Start the server:
   ```sh
   npm run dev

API Documentation
The API is documented using Swagger. You can view the API documentation at http://localhost:3000/api-docs once the server is running.
   
