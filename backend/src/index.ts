import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import orderRoutes from './routes/orderRoutes';
import fertilizerRoutes from './routes/fertilizerRoutes';
import seedRoutes from './routes/seedRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Use true if using HTTPS
}));

// Routes
app.use('/api/orders', orderRoutes);
app.use('/api/fertilizers', fertilizerRoutes);
app.use('/api/seeds', seedRoutes);
app.use('/api/auth', authRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/farmerOrderingSystem')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// Exporting `app` as a named export
export { app };
