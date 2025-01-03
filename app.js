const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const http = require("http"); // Import HTTP module
const socketio = require("socket.io"); // Import Socket.IO
const nodemailer = require("nodemailer");
const app = express();
const server = http.createServer(app); // Create HTTP server with the app
const io = socketio(server); // Attach Socket.IO to the server
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const weatherRouter = require("./routes/weatherRoutes");
const frontRoutes = require("./routes/frontRoutes");
const adminRoutes = require('./routes/adminRoutes');
const registerRoutes = require('./routes/registerRoutes'); 
const News = require('./models/newsModel');

dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
 
// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", "./views");
// Route to render home.ejs
app.get("/", async(req, res) => {
  try {
    const latestNews = await News.find().sort({ date: -1 }).limit(3);
    const newsList = await News.find().sort({ createdAt: -1 });
      res.render('frontend/home', { latestNews:latestNews ,newsList:newsList,errorMessage:null});
  } catch (err) {
     res.render('frontend/home', { latestNews:null,errorMessage: 'Error fetching news' });
  }
 });
 
app.use("/weather", weatherRouter);

app.get("/sports", async(req, res) => {
  try {
    const newsList = await News.find().sort({ createdAt: -1 });
      res.render('frontend/sports', {newsList:newsList,errorMessage:null});
  } catch (err) {
     res.render('frontend/sports', { newsList:null,errorMessage: 'Error fetching news' });
  }
 });

// Contact Us Page Route
app.get("/contact", (req, res) => {
  res.render("frontend/contact");
});
// About Us Page Route
app.get("/about", (req, res) => {
  res.render("frontend/about");
});
 
app.use('/admin', adminRoutes);
app.use('/auth', registerRoutes);
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
// Contact Form Submission (POST Route)
app.post("/submit-form", (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }
  // Send email using Nodemailer (optional)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com", // Replace with your email
      pass: "your-email-password", // Replace with your email password
    },
  });
  const mailOptions = {
    from: email,
    to: "your-email@gmail.com", // Replace with your email
    subject: `Contact Form: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to send email" });
    }
    res.status(200).json({ message: "Form submitted successfully" });
  });
});
// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));
// Routes

 
app.use("/", frontRoutes); 
// WebSocket Connection
io.on("connection", (socket) => {
  console.log("New WebSocket connection");
  // Listen for messages from clients
  socket.on("sendMessage", (message) => {
    io.emit("message", message); // Broadcast message to all connected clients
  });
  socket.on("disconnect", () => {
    console.log("WebSocket disconnected");
  });
});
// Server Start
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
