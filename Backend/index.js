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

connectDb(process.env.MONGO_URI);

const allowedOrigins = process.env.ORIGIN.split(',').map(origin => origin.trim());

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, 
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 60 * 60, 
  }),
  cookie: {
    secure: false, 
    httpOnly: true,
    sameSite: 'lax',
  }
}));

app.use('/uploads', express.static('uploads'));


app.use('/food', FoodRoutes);
app.use('/user', Userrouter);
app.use('/cart', AuthMiddleware, cartRoutes);
app.use('/orders', AuthMiddleware, orderRoutes);


app.use((err, req, res, next) => {
  if (err.message === 'Only image files are allowed!') {
    return res.status(400).json({ error: err.message });
  }
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`); 
});
