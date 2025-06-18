const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoos= require('mongoose');
// Load environment variables
dotenv.config();

const app = express();

mongoos.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the backend API' });
});

// Project Details API
const projectDetailsRouter = require('./routes/projectDetails');
app.use('/api/projects', projectDetailsRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
