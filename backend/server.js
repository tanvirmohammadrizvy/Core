const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const brandRoutes = require('./routes/brandRoutes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/core', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Use brand routes
app.use('/api', brandRoutes);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});
