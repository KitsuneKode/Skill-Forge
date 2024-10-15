const app = require('./app');
const connectDB = require('./config/database');

const PORT = require('./config/env').port;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to PORT', err.message);
  });
