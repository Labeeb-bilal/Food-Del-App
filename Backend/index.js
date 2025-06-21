const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');

dotenv.config();

const FoodRoutes = require('./routes/foodRoutes');
const Userrouter = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const { AuthMiddleware } = require('./middleware/auth');
const { connectDb } = require('./config/db');

const app = express();
const PORT = process.env.PORT; 

// ✅ Connect to MongoDB
connectDb(process.env.MONGO_URI);

// ✅ CORS must come before any other middleware
app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true, // Allow cookies to be sent
}));

// ✅ Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Session setup with connect-mongo
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false, // Do not save empty sessions
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 60 * 60, // 1 hour session TTL
  }),
  cookie: {
    secure: false, // Set to true only in production with HTTPS
    httpOnly: true,
    sameSite: 'lax',
  }
}));

// ✅ Static file serving (for uploads)
app.use('/uploads', express.static('uploads'));

// ✅ Routes
app.use('/food', FoodRoutes);
app.use('/user', Userrouter);
app.use('/cart', AuthMiddleware, cartRoutes);
app.use('/orders', AuthMiddleware, orderRoutes);

//Global error handler (example: image upload error)
app.use((err, req, res, next) => {
  if (err.message === 'Only image files are allowed!') {
    return res.status(400).json({ error: err.message });
  }
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

//Start server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
