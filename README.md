# Property Listing API

A minimal REST API for property listings with user authentication using Node.js, Express, MySQL, and Sequelize.

## Features

- User registration and authentication (JWT)
- Property CRUD operations
- User-specific property management
- Public property browsing
- Secure password hashing with bcryptjs

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL2** - MySQL driver
- **Sequelize** - ORM for database operations
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **dotenv** - Environment variable management
- **cors** - Cross-origin resource sharing

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd property-listing-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your database configuration:
   ```env
   DB_HOST=localhost
   DB_DIALECT=mysql
   DB_NAME=property_listing_db
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   JWT_SECRET=your_jwt_secret_key_here
   PORT=3000
   ```

4. **Create database**
   ```bash
   mysql -u root -p -e "CREATE DATABASE property_listing_db;"
   ```

5. **Run database migrations**
   ```bash
   npx sequelize-cli db:migrate
   ```

## Usage

### Start the server

```bash
# Development
npm run dev

# Production
npm start
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Properties

#### Get all properties (Public)
```http
GET /api/properties
```

#### Get single property (Public)
```http
GET /api/properties/:id
```

#### Create property (Protected)
```http
POST /api/properties
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Beautiful House",
  "description": "A lovely 3-bedroom house with garden",
  "price": 250000,
  "bedrooms": 3,
  "bathrooms": 2,
  "area": 1500,
  "type": "house",
  "location": "New York, NY"
}
```

#### Update property (Protected - Owner only)
```http
PUT /api/properties/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Updated Beautiful House",
  "price": 260000
}
```

#### Delete property (Protected - Owner only)
```http
DELETE /api/properties/:id
Authorization: Bearer <jwt_token>
```

#### Get user's properties (Protected)
```http
GET /api/properties/user/my-properties
Authorization: Bearer <jwt_token>
```

### Health Check
```http
GET /api/health
```

## Database Schema

### Users Table
- `id` - Primary key
- `email` - Unique email address
- `password` - Hashed password
- `firstName` - User's first name
- `lastName` - User's last name
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

### Properties Table
- `id` - Primary key
- `title` - Property title
- `description` - Property description
- `price` - Property price
- `bedrooms` - Number of bedrooms
- `bathrooms` - Number of bathrooms
- `area` - Property area in square feet
- `type` - Property type (house, apartment, etc.)
- `location` - Property location
- `UserId` - Foreign key to Users table
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

## Project Structure

```
property-listing-api/
├── config/
│   └── config.json          # Sequelize configuration
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── models/
│   ├── index.js             # Sequelize models index
│   ├── user.js              # User model
│   └── property.js          # Property model
├── routes/
│   ├── auth.js              # Authentication routes
│   └── properties.js        # Property routes
├── migrations/              # Database migrations
├── seeders/                 # Database seeders
├── .env                     # Environment variables
├── .env.example             # Environment variables template
├── server.js                # Main server file
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected routes requiring authentication
- Owner-based authorization for property operations
- CORS enabled for cross-origin requests

## Error Handling

The API includes comprehensive error handling:
- Validation errors (400)
- Authentication errors (401)
- Authorization errors (403)
- Not found errors (404)
- Server errors (500)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.
