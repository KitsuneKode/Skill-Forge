# SkillForge Backend

This is the backend for a course-selling platform that allows users to buy and sell courses. The project is built using **Node.js**, **Express.js**, and **MongoDB**, with support for user authentication, course management, payment processing, and role-based access (Admin, Student, Instructor).

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [To-Do Features](#to-do-features)
- [Contributing](#contributing)
- [License](#license)

## Features

- [x] **User Authentication**: Users can sign up, log in, log out, and reset their password using JWT tokens.
- [x] **Role-Based Access**: Different roles like `Student`, `Admin`, and `Content Creator` with specific permissions.
- [x] **Course Management**: Content Creators can create, update, and delete courses. Users can purchase courses and leave reviews.
- [ ] **Admin Panel**: Admins can manage users, approve courses, and view course sales.
- [ ] **Payment Integration**: Integrated with Stripe for secure payment processing.
- [ ] **Notification System**: Users get notifications on course purchases, promotions, and course completions.
- [ ] **Rate Limiting**: Prevent abuse of the API by limiting the number of requests from a specific IP.
- [x] **CORS & Security**: Configured CORS to restrict API access and additional User-Agent validation to prevent access from tools like Postman.

## Technologies

- **Node.js**: Server-side runtime.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing users, courses, payments, etc.
- **JWT (JSON Web Tokens)**: Token-based authentication.
- **CORS**: Cross-origin request handling for security.
- ~~**Rate Limiting**: Prevent excessive requests.~~
- **Bcrypt.js**: Password hashing for security.

## Project Structure


- ####  Picture :
    
<div align="center">
    <img src="./public/Untitled-2024-09-23-1325.png" width="70%" alt="Project Structure">
</div>


<br>


- ####  Tree Structure :

```bash
├── controllers
│   ├── authController.js
│   ├── courseController.js
│   ├── instructorController.js
│   └── learnerController.js
│
├── models
│   ├── User.js
│   ├── Course.js
│   ├── Learner.js
│   ├── Instructor.js
│   ├── refresh-tokens.js
│   ├── PurchasedCourses.js
│   └── Admin.js
│
├── middlewares
│   ├── authMiddleware.js
│
├── routes
│   ├── authRoutes.js
│   ├── courseRoutes.js
│   ├── instructorRoutes.js
│   └── learnerRoutes.js
│
├── config
│   ├── db.js
│   └── env.js
│
├── utils
│   └── jwtHelper.js
│
├── .env
├── README.md
├── package.json
├── app.js
└── server.js
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/kitsunekode/SkillForge.git
cd SkillForge/backend
```

2. Install dependencies:

```bash
pnpm install
```

## Environment Variables

Create a `.env` file in the root directory and configure the following environment variables:

```bash
# MongoDB
DB_URI=your_mongodb_uri

# JWT Secret
JWT_SECRET_ACCESS_TOKEN=your_jwt_secret
JWT_SECRET_REFRESH_TOKEN=your_jwt_secret

FRONTEND_URL=your_frontend_url

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

- **POST** `/api/v1/auth/signup` - Register a new user
- **POST** `/api/v1/auth/login` - Login for existing users
- **POST** `/api/v1/auth/logout` - Logout the current user
- **POST** `/api/v1/auth/refresh-token` -  Refresh the user's access token
- ~~**POST** `/api/v1/auth/reset-password` - Reset the user's password~~
- **POST** `/api/v1/courses` - Create a new course (Content Creators only)
- **GET** `/api/v1/courses` - Get all courses
- **GET** `/api/v1/courses/:id` - Get courses by id
- **POST** `/api/v1/courses/:id/purchase` - Purchase a course (Students only)
- **GET** `/api/v1/learner/courses` - Get current user purchased courses (Students only)
- **GET** `/api/v1/learner/me` - Get current user profile (Students only)
- **GET** `/api/v1/instructor/me` - Get current user profile (Content Creators only)
- **GET** `/api/v1/instructor/courses` - Get courses created by the current user (Content Creators only)
- **PUT** `/api/v1/courses/:id` -  Update a course (Content Creators only)
- **DELETE** `/api/v1/courses/:id` -  Delete a course (Content Creators only)


~~You can use **Swagger** for detailed API documentation.~~

~~### Swagger Documentation~~

~~You can access the API docs via `/api-docs` if Swagger is set up.~~

## Testing

Run tests using the following command:

```bash
npm test
```

### Testing Strategy
##### ***Unit Tests Help***: Create a test suite for each service and controller. much appreciated. 

- [ ] **Unit Tests**:~~Cover individual services and controllers.~~
- [ ] **Integration Tests**: ~~Test interactions between various parts of the application.~~
- [ ] **End-to-End Tests**: ~~Simulate user interactions and ensure the entire flow works.~~


## To-Do Features

- [ ] Full Admin Dashboard with advanced analytics and user management
- [ ] Add Review and Rating System for Courses
- [ ] Role-Based Dashboard for Content Creators and Admins
- [ ] Integrate AWS S3 or another cloud storage solution for hosting course videos
- [ ] Set up email notifications with SendGrid for marketing campaigns
- [ ] Add advanced logging and monitoring (e.g., using Winston or a monitoring tool like Prometheus)

## Contributing

Feel free to open a pull request if you'd like to contribute to this project.

## License

This project is licensed under the MIT License.

## Author

- [Kitsunekode](github.com/kitsunekode)