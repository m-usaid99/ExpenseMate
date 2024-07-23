const app = require('./app');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config('./.env');

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

