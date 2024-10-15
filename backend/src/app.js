// app.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const learnerRoutes = require('./routes/learner.routes');
const courseRoutes = require('./routes/course.routes');
const instructorRoutes = require('./routes/instructor.routes');
const { frontendURL } = require('./config/env');

const app = express();
app.use(express.json());

// app.use(helmet());
app.use(cors(frontendURL));
app.use(cookieParser());
app.use('/api/v1/auth', authRoutes);
// app.use(authenticateToken());
app.use('/api/v1/learner', learnerRoutes);
// app.use('/api/v1/instructor', instructorRoutes);
app.use('/api/v1/course', courseRoutes);

module.exports = app;
