# Users REST API

A modern, extensible RESTful API for user management built with Node.js, Express, and PostgreSQL.

## Features

- RESTful API with standard CRUD operations for users
- PostgreSQL database integration
- Comprehensive error handling
- Logging with winston
- API documentation with Swagger UI
- Scalable architecture with separation of concerns
- Prepared for future JWT authentication

## Quality Features

- **Testability**: Separation of concerns makes unit testing easy
- **Observability**: Comprehensive logging with winston
- **Maintainability**: Clear code organization and modular architecture
- **Scalability**: Designed to be cloud-ready and horizontally scalable
- **Cross-Platform Compatibility**: Runs on any platform that supports Node.js

## API Endpoints

- `GET /api/v1/users` - List all users
- `GET /api/v1/users/{id}` - Get user by ID
- `POST /api/v1/users` - Create user
- `PUT /api/v1/users/{id}` - Update user
- `DELETE /api/v1/users/{id}` - Delete user

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Documentation**: OpenAPI/Swagger

## Getting Started

### Prerequisites

- Node.js 16.x or later
- PostgreSQL 14.x or later

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Configure environment variables (copy `.env.example` to `.env` and update values)
4. Start the server in development mode:
```bash
npm run dev
```

### Production Deployment

For production deployment:
```bash
npm start
```

## Cloud Deployment

### Railway Deployment (Recommended)

This API is set up for easy deployment to Railway:

1. Sign up for [Railway](https://railway.app/)
2. Click "New Project" → "Deploy from GitHub repo"
3. Add a PostgreSQL service
4. Set up environment variables:
   - `NODE_ENV=production`
   - `DATABASE_URL` (Railway will provide this)
   - `JWT_SECRET=your_secret_key`

For detailed Railway deployment instructions, see [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md)

### Other Cloud Platforms

This API is designed to be deployable to various cloud platforms:

- **Azure App Service**: Host the Node.js application
- **Azure Database for PostgreSQL**: Managed PostgreSQL database
- **Azure Key Vault**: Store secrets and configuration
- **Azure Monitor**: Application insights and monitoring

## API Documentation

API documentation is available at `/api-docs` when the server is running:
- Local: http://localhost:3000/api-docs
- Railway: https://your-app-name.up.railway.app/api-docs

## Project Structure

```
├── src/
│   ├── api/
│   │   └── v1/
│   │       ├── controllers/    # Request handlers
│   │       ├── middleware/     # Express middleware
│   │       ├── models/         # Database models
│   │       ├── routes/         # API routes
│   │       └── services/       # Business logic
│   ├── config/                 # Application configuration
│   ├── db/                     # Database setup and migration
│   ├── docs/                   # API documentation
│   └── utils/                  # Utility functions
├── .env                        # Environment variables
├── .env.example                # Example environment variables
├── Dockerfile                  # Container definition for deployment
├── railway.json                # Railway configuration
├── package.json                # Project dependencies
└── README.md                   # Project documentation
```

## Future Enhancements

- JWT Authentication
- Rate limiting
- Additional API endpoints for other entities
- Integration tests
- Containerization with Docker 