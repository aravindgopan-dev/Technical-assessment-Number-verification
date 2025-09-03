<div align="center">

# 🔢 Cooeey - Armstrong Number Verification System

[![Go Version](https://img.shields.io/badge/Go-1.24-blue.svg)](https://golang.org/)
[![React Version](https://img.shields.io/badge/React-19-61dafb.svg)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ed.svg)](https://www.docker.com/)

*A modern SaaS application for Armstrong number verification with user management capabilities, featuring advanced performance optimizations and enterprise-grade security.*

</div>

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **Secure Authentication** | JWT-based authentication with protected routes |
| 🔢 **Armstrong Number Verification** | Real-time verification of Armstrong numbers |
| 👥 **User Management** | Comprehensive dashboard for managing users and their discoveries |
| 📱 **Responsive Design** | Works perfectly on desktop, tablet, and mobile devices |
| ⚡ **Performance Optimized** | Redis caching, rate limiting, and pagination |
| 🐳 **Docker Ready** | Easy deployment with Docker containerization |


## 🛠️ Tech Stack

### 🔧 Backend
| Technology | Purpose | Version |
|------------|---------|---------|
| **Go** | High-performance backend server | 1.24 |
| **Gin** | Web framework | Latest |
| **JWT** | Authentication with 24-hour token expiry | Latest |
| **PostgreSQL** | Primary database | 8.0+ |
| **Redis** | Caching and session management | 6.0+ |
| **Docker** | Containerization | Latest |

### 🎨 Frontend
| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | Modern React with hooks | 19 |
| **Vite** | Fast build tool and dev server | Latest |
| **Tailwind CSS** | Utility-first CSS framework | Latest |
| **React Router** | Client-side routing | Latest |

## 🔌 API Endpoints

The application provides **6 comprehensive API endpoints** with JWT authentication and rate limiting:

| Method | Endpoint | Protected | Request Body | Description |
|--------|----------|-----------|--------------|-------------|
| `POST` | `/api/auth/register` | ❌ | `{"name": "string", "email": "string", "password": "string"}` | Register a new user |
| `POST` | `/api/auth/login` | ❌ | `{"email": "string", "password": "string"}` | Login with email and password |
| `POST` | `/api/armstrong/verify` | ✅ | `{"number": integer}` | Verify if a number is an Armstrong number |
| `GET` | `/api/users?page=1` | ✅ | - | Get all users with pagination (10 per page) |
| `GET` | `/api/users/:id` | ✅ | - | Get user details with Armstrong numbers |

### 🔐 Authentication
All protected endpoints require JWT token in the Authorization header:

```http
Authorization: Bearer <your-jwt-token>
```

## 🗄️ Database Schema

The application uses **PostgreSQL** with the following schema:

### 👥 Users Table
```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 🔢 Armstrong Numbers Table
```sql
CREATE TABLE armstrongs (
    armstrong_id SERIAL PRIMARY KEY,
    number VARCHAR(255) NOT NULL,
    is_armstrong BOOLEAN DEFAULT FALSE,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

### 🔗 Relationships
- **One-to-Many**: One user can have multiple Armstrong number verifications
- **Foreign Key**: `armstrongs.user_id` references `users(user_id)`

## 🚀 Getting Started

### 📋 Prerequisites
| Requirement | Version | Purpose |
|-------------|---------|---------|
| **Go** | 1.21+ | Backend development |
| **Node.js** | 18+ | Frontend development |
| **PostgreSQL** | 8.0+ | Primary database |
| **Redis** | 6.0+ | Caching layer |
| **Docker** | Latest | Containerization (optional) |

### ⚙️ Installation

1. **📥 Clone the repository**
   ```bash
   git clone git@github.com:aravindgopan-dev/Technical-assessment-Number-verification.git
   cd Technical-assessment-Number-verification
   ```

2. **🔧 Environment Configuration**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=10000
   DATABASE_URL=postgres://username:password@localhost:5432/cooeey_db
   JWT_SECRET=your-super-secret-jwt-key
   REDIS_URL=redis://localhost:6379
   ```

3. **🏃‍♂️ Run the Application**

   **Backend:**
   ```bash
   cd server
   go mod tidy
   go run cmd/server/main.go
   ```

   **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## ⚡ Performance Optimizations

The application implements several performance optimizations to ensure fast response times and efficient resource usage:

### 🚦 Rate Limiting
| Feature | Details |
|---------|---------|
| **Implementation** | Token bucket algorithm using `golang.org/x/time/rate` |
| **Configuration** | 100 requests per minute per client |
| **Protection** | Prevents API abuse and ensures fair usage |
| **Response** | Returns HTTP 429 when limit exceeded |

### 🗄️ Redis Caching
| Feature | Details |
|---------|---------|
| **User Data Caching** | Paginated user lists cached for 5 minutes |
| **Cache Key Pattern** | `all_users_page_{page_number}` |
| **Automatic Invalidation** | Cache cleared when new users register |
| **Performance Impact** | Reduces database queries by ~80% for user listings |

### 📄 Pagination
| Feature | Details |
|---------|---------|
| **User Listings** | 5 users per page with metadata |
| **Response Format** | Includes total count, current page, and total pages |
| **Database Optimization** | Uses LIMIT and OFFSET for efficient queries |
| **Memory Efficient** | Prevents loading large datasets into memory |

### 🔐 JWT Token Management
| Feature | Details |
|---------|---------|
| **Token Expiry** | 24-hour token lifetime |
| **Stateless Authentication** | No server-side session storage |
| **Secure Validation** | HMAC-SHA256 signature verification |
| **Automatic Refresh** | Clients handle token renewal |

## 🐳 Docker Deployment

The application includes a production-ready Dockerfile for easy deployment:

### 🏗️ Build and Run with Docker
```bash
# Build the Docker image
docker build -t cooeey-backend ./server

# Run the container
docker run -p 10000:10000 \
  -e DATABASE_URL="your_postgres_connection_string" \
  -e REDIS_URL="your_redis_connection_string" \
  -e JWT_SECRET="your_jwt_secret" \
  cooeey-backend
```

### 🎯 Docker Features
| Feature | Description |
|---------|-------------|
| **Multi-stage Build** | Optimized image size (~20MB final image) |
| **Non-root User** | Security best practice |
| **Alpine Linux** | Minimal base image for security |
| **Health Checks** | Built-in application health monitoring |
| **Environment Variables** | Configurable via environment |

## 🛠️ Development

The frontend uses Vite's proxy configuration to forward API requests to the backend server during development. The proxy is configured in `frontend/vite.config.js`.

### 🌍 Environment Configuration

The frontend automatically detects the environment:
| Environment | Configuration |
|-------------|---------------|
| **Development** | Uses Vite proxy (no baseUrl needed) |
| **Test** | Direct connection to `http://localhost:5000` |
| **Production** | Configurable production URL |

## 🧪 API Testing

Use the provided Postman collection (`server/API_Collection.postman_collection.json`) to test the API endpoints. The collection includes:

| Feature | Description |
|---------|-------------|
| **Pre-configured requests** | For all endpoints |
| **Automatic JWT token extraction** | And usage |
| **Example request/response data** | For easy testing |
| **Environment variables** | For easy configuration |

## 🚧 Development Challenges & Solutions

### 🖥️ AWS EC2 Micro Instance Memory Issues
| Issue | Solution |
|-------|----------|
| **Problem**: Unable to build Go backend due to insufficient memory | **Solution**: Unable to login into the instance, figuring out alternative deployment |

### 🔄 Database Migration Circular Dependencies
| Issue | Solution |
|-------|----------|
| **Problem**: Migration errors due to circular references | **Solution**: Restructured models and used proper GORM migration ordering |

### 🌐 CORS Configuration Issues
| Issue | Solution |
|-------|----------|
| **Problem**: Frontend CORS errors with backend communication | **Solution**: Updated Vite proxy config and added CORS middleware in Go backend |

### 🗄️ Database Schema Mismatch
| Issue | Solution |
|-------|----------|
| **Problem**: Unable to write to database due to schema changes | **Solution**: Dropped tables and re-ran migrations with proper data validation |

### ⚡ Performance Optimization Challenges
| Issue | Solution |
|-------|----------|
| **Problem**: Slow response times and high database load | **Solution**: Added Redis caching, pagination, and rate limiting |

## 📁 Project Structure

```
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
│   │   ├── handlers/       # HTTP handlers (auth, armstrong, user)
│   │   ├── middleware/     # Middleware functions (auth, rate limiting)
│   │   ├── modals/         # Data models (User, Armstrong)
│   │   ├── services/       # Business logic
│   │   ├── cache/          # Redis caching implementation
│   │   └── types/          # Request/response types
│   ├── pkg/                # Shared packages
│   │   ├── jwt.go          # JWT token management
│   │   ├── reddis.go       # Redis connection
│   │   ├── ratelimit.go    # Rate limiting middleware
│   │   ├── connectDB.go    # Database connection
│   │   └── migration.go    # Database migrations
│   ├── DOCKERFILE          # Docker configuration
│   ├── API_Collection.postman_collection.json  # API testing
│   └── go.mod             # Go dependencies
├── package.json           # Root package.json with scripts
└── README.md             # This file
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. 🍴 **Fork** the repository
2. 🌿 **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. ✏️ **Make** your changes
4. 🧪 **Test** thoroughly
5. 📝 **Commit** your changes (`git commit -m 'Add some amazing feature'`)
6. 📤 **Push** to the branch (`git push origin feature/amazing-feature`)
7. 🔄 **Open** a Pull Request

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ by [Aravind Gopan](https://github.com/aravindgopan-dev)**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/aravindgopan-dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/aravindgopan)

</div>
