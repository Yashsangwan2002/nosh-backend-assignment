const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const socket = require('./socket'); 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Use cors middleware
app.use(cors({
  origin: true, // Allow only your client's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allowed methods
  credentials: true // Allow cookies if your app uses them
}));

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

    // Real-time updates using Socket.io
    const io = socket.init(server);

    io.on('connection', (socket) => {
      console.log('A user connected');
      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });

    // Add the io instance to the request object
    app.use((req, res, next) => {
      req.io = io;
      next();
    });

    // Routes
    const dishRoutes = require('./routes/dishRoutes');
    app.use('/api/dishes', dishRoutes);

  })
  .catch((error) => console.error('MongoDB connection error:', error));
