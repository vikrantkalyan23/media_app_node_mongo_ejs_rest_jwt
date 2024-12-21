const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const http = require('http'); // Import HTTP module
const socketio = require('socket.io'); // Import Socket.IO

dotenv.config();

const app = express();
const server = http.createServer(app); // Create HTTP server with the app
const io = socketio(server); // Attach Socket.IO to the server

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));


app.use(express.static('public'));

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Route to render home.ejs
app.get('/', (req, res) => {
    res.render('pages/home');
});

app.get('/sports', (req, res) => {
    res.render('pages/sports');
});

// Contact Us Page Route
app.get('/contact', (req, res) => {
    res.render('pages/contact');
});

// About Us Page Route
app.get('/about', (req, res) => {
    res.render('pages/about');
});

// Contact Form Submission (POST Route)
app.post('/contact', (req, res) => {
    // Handle form submission here
    res.send('Thank you for contacting us!');
});

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error(err));

// Routes
const customerRoutes = require('./routes/customer');
const adminRoutes = require('./routes/admin');
app.use('/', customerRoutes);
app.use('/admin', adminRoutes);

// WebSocket Connection
io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    // Listen for messages from clients
    socket.on('sendMessage', (message) => {
        io.emit('message', message); // Broadcast message to all connected clients
    });

    socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
    });
});

// Server Start
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
