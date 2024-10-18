// [x] CHECKED

const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

module.exports = {
  port: process.env.PORT || 3000, // Server port
  dbURI: process.env.DB_URI || '', // MongoDB URI
  accessTokenJWTSecret:
    process.env.JWT_SECRET_ACCESS_TOKEN || 'your_jwt_secret_key', // access token JWT secret
  refreshTokenJWTSecret:
    process.env.JWT_SECRET_REFRESH_TOKEN || 'your_jwt_secret_key', // refresh token JWT secret
  stripeApiKey: process.env.STRIPE_API_KEY || 'your_stripe_api_key', // Payment Gateway API key (Stripe)
  sendgridApiKey: process.env.SENDGRID_API_KEY || 'your_sendgrid_api_key', // Email service API key (SendGrid)
  frontendURL: process.env.FRONTEND_URL || 'http://localhost:5173', // Frontend URL
};
