import express from 'express';
import connectDB from './db.js';  // Import the DB connection
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import vendorRoutes from './routes/vendorRoutes.js'
import petRoutes from './routes/petRoutes.js'
import adoptionRoutes from './routes/adoptionRoutes.js'
import adminStats from './routes/adminStats.js'
import blogRoutes from './routes/blogsRoutes.js'; // Import the blog routes
import whatsappRoutes from './routes/whatsapp.js'; // Import the WhatsApp routes

const app = express();
const PORT = 3000;



// ✅ Allowed frontend origins
const allowedOrigins = ['https://nayasathi.vercel.app'];

// ✅ CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, allowedOrigins[0]); // Allow undefined (e.g., mobile apps or Postman)

    if (allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// ✅ Handle preflight (OPTIONS) requests
app.options('*', cors());


// Connect to MongoDB
connectDB();

app.use(express.urlencoded({ extended: true })); // For form-data (application/x-www-form-urlencoded)
app.use(express.json()); // Middleware to parse JSON data
app.use(cookieParser());



app.get('/', (req, res) => {
  res.send('🚀 WhatsApp Messaging API is running');
});

// Define routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use("/api/vendors", vendorRoutes);  // All vendor routes will be prefixed with /api/vendors
app.use("/api/pets", petRoutes); // Mount pet routes
app.use("/api/adoption", adoptionRoutes); // Mount pet routes
app.use("/api/admin", adminStats); // Mount pet routes
app.use('/api/whatsapp', whatsappRoutes);
app.use('/api/blogs', blogRoutes); // Mount blog routes


// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});