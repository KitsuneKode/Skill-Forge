# SkillForge Backend

This is the backend for a course-selling platform that allows users to buy and sell courses. The project is built using **Node.js**, **Express.js**, and **MongoDB**, with support for user authentication, course management, payment processing, and role-based access (Admin, Student, Instructor).

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [To-Do Features](#to-do-features)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Users can sign up, log in, log out, and reset their password using JWT tokens.
- **Role-Based Access**: Different roles like `Student`, `Admin`, and `Content Creator` with specific permissions.
- **Course Management**: Content Creators can create, update, and delete courses. Users can purchase courses and leave reviews.
- **Admin Panel**: Admins can manage users, approve courses, and view course sales.
- **Payment Integration**: Integrated with Stripe for secure payment processing.
- **Notification System**: Users get notifications on course purchases, promotions, and course completions.
- **Rate Limiting**: Prevent abuse of the API by limiting the number of requests from a specific IP.
- **CORS & Security**: Configured CORS to restrict API access and additional User-Agent validation to prevent access from tools like Postman.

## Technologies

- **Node.js**: Server-side runtime.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing users, courses, payments, etc.
- **JWT (JSON Web Tokens)**: Token-based authentication.
- **Stripe**: Payment processing.
- **CORS**: Cross-origin request handling for security.
- **Rate Limiting**: Prevent excessive requests.
- **Bcrypt.js**: Password hashing for security.
- **AWS S3**: File storage for hosting course videos (optional, based on your setup).

## Project Structure

```bash
├── controllers
│   ├── authController.js
│   ├── courseController.js
│   ├── paymentController.js
│   ├── reviewController.js
│   └── userController.js
├── models
│   ├── User.js
│   ├── Course.js
│   ├── Payment.js
│   ├── Review.js
│   └── Notification.js
├── services
│   ├── authService.js
│   ├── courseService.js
│   ├── paymentService.js
│   ├── reviewService.js
│   └── notificationService.js
├── middlewares
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   ├── rateLimitMiddleware.js
│   ├── corsMiddleware.js
├── routes
│   ├── authRoutes.js
│   ├── courseRoutes.js
│   ├── paymentRoutes.js
│   ├── reviewRoutes.js
│   └── userRoutes.js
├── config
│   ├── db.js
│   └── env.js
├── utils
│   └── tokenUtils.js
├── .env
├── README.md
├── package.json
├── app.js
└── server.js
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/course-selling-backend.git
cd course-selling-backend
```

2. Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory and configure the following environment variables:

```bash
# MongoDB
MONGO_URI=mongodb://localhost:27017/courses

# JWT Secret
JWT_SECRET=your_jwt_secret

# Stripe Keys
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLIC_KEY=your_stripe_public_key

# App Configuration
PORT=5000
```

## Running the Application

To run the application in development mode:

```bash
npm run dev
```

For production:

```bash
npm start
```

## API Documentation

The API uses RESTful principles for route design. A few key endpoints:

- **POST** `/api/auth/signup` - Register a new user
- **POST** `/api/auth/login` - Login for existing users
- **POST** `/api/courses` - Create a new course (Content Creators only)
- **GET** `/api/courses` - Get all courses
- **POST** `/api/payments` - Process payment using Stripe
- **GET** `/api/users/me` - Get current user profile

You can use **Swagger** for detailed API documentation.

### Swagger Documentation

You can access the API docs via `/api-docs` if Swagger is set up.

## Testing

Run tests using the following command:

```bash
npm test
```

### Testing Strategy

- **Unit Tests**: Cover individual services and controllers.
- **Integration Tests**: Test interactions between various parts of the application.
- **End-to-End Tests**: Simulate user interactions and ensure the entire flow works.

## Implemented Features

- [x] User Authentication with JWT (Sign-up, Login, Logout, Password Reset)
- [x] Role-Based Access Control (Admin, Student, Content Creator)
- [x] Course Management (Create, Update, Delete, List)
- [ ] Payment Processing with Stripe
- [x] Notification System for Purchases, Promotions, and Updates
- [x] Basic Admin Panel for Managing Courses and Users
- [x] Rate Limiting and CORS for Security
- [x] Basic Logging and Error Handling

## To-Do Features

- [ ] Full Admin Dashboard with advanced analytics and user management
- [ ] Implement Refund System for Payments
- [ ] Add Review and Rating System for Courses
- [ ] Role-Based Dashboard for Content Creators and Admins
- [ ] Add Subscription Plan and Gamification System
- [ ] Implement a Recommendation Engine for Courses
- [ ] Integrate AWS S3 or another cloud storage solution for hosting course videos
- [ ] Set up email notifications with SendGrid for marketing campaigns
- [ ] Add advanced logging and monitoring (e.g., using Winston or a monitoring tool like Prometheus)

## Contributing

Feel free to open a pull request if you'd like to contribute to this project.

## License

This project is licensed under the MIT License.
```

### New Sections Added:
- **Implemented Features**: Lists the features that have been completed.
- **To-Do Features**: Lists the upcoming features and tasks to be implemented in future versions of the project.