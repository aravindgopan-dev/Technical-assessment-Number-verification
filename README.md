# Cooeey - Armstrong Number Verification System

A modern SaaS application for Armstrong number verification with user management capabilities.

## Features

- 🔐 **Secure Authentication** - JWT-based authentication with protected routes
- 🔢 **Armstrong Number Verification** - Real-time verification of Armstrong numbers
- 👥 **User Management** - Comprehensive dashboard for managing users and their discoveries
- 🎨 **Modern Dark Theme** - Beautiful, responsive dark theme with glass morphism effects
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices

## Tech Stack

### Backend
- **Go** - High-performance backend server
- **Gin** - Web framework
- **JWT** - Authentication
- **MySQL** - Database

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

## API Endpoints

The application provides the following API endpoints (matching the Postman collection):

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with email and password

### Armstrong Numbers
- `POST /api/armstrong/verify` - Verify if a number is an Armstrong number (requires JWT)

### Users
- `GET /api/users?page=1` - Get all users with pagination (requires JWT)
- `GET /api/users/:userId` - Get user details with Armstrong numbers (requires JWT)

## Getting Started

### Prerequisites
- Go 1.21 or higher
- Node.js 18 or higher
- MySQL 8.0 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cooeey
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up the database**
   - Create a MySQL database
   - Update the database configuration in `server/config/database.go`

4. **Run the application**
   ```bash
   npm run dev
   ```

   This will start both the backend server (port 5000) and frontend development server (port 3000).

### Alternative: Run servers separately

**Backend only:**
```bash
cd server
go run cmd/server/main.go
```

**Frontend only:**
```bash
cd frontend
npm run dev
```

## Development

The frontend uses Vite's proxy configuration to forward API requests to the backend server during development. The proxy is configured in `frontend/vite.config.js`.

### Environment Configuration

The frontend automatically detects the environment:
- **Development**: Uses Vite proxy (no baseUrl needed)
- **Test**: Direct connection to `http://localhost:5000`
- **Production**: Configurable production URL

## API Testing

Use the provided Postman collection (`server/API_Collection.postman_collection.json`) to test the API endpoints. The collection includes:

- Pre-configured requests for all endpoints
- Automatic JWT token extraction and usage
- Example request/response data
- Environment variables for easy configuration

## Project Structure

```
cooeey/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context (Auth)
│   │   ├── config/         # API configuration
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── server/                 # Go backend application
│   ├── cmd/server/         # Main application entry point
│   ├── internals/          # Internal packages
│   │   ├── handlers/       # HTTP handlers
│   │   ├── middleware/     # Middleware functions
│   │   ├── models/         # Data models
│   │   └── services/       # Business logic
│   └── go.mod             # Go dependencies
├── package.json           # Root package.json with scripts
└── README.md             # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
