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
const PORT = process.env.PORT || 8000;

// ✅ Connect to MongoDB
connectDb(process.env.MONGO_URI || 'mongodb://localhost:27017/Food-Del');

// ✅ CORS setup
const allowedOrigins = [
  'http://localhost:5173',
  process.env.ORIGIN, // like 'https://food-del-app-frontend-7k72.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/Food-Del',
    ttl: 60 * 60, // 1 hour
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  },
}));

// ✅ Static files (uploads)
app.use('/uploads', express.static('uploads'));

// ✅ API Routes
app.use('/food', FoodRoutes);
app.use('/user', Userrouter);
app.use('/cart', AuthMiddleware, cartRoutes);
app.use('/orders', AuthMiddleware, orderRoutes);

// ✅ Global error handler
app.use((err, req, res, next) => {
  if (err.message === 'Only image files are allowed!') {
    return res.status(400).json({ error: err.message });
  }
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
