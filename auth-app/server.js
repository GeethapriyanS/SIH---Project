require('dotenv').config();  // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' directory

// MongoDB connection using environment variable
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const authRoutes = require('./routes/auth');

// Use routes
app.use('/api/auth', authRoutes);  // Use the /api/auth prefix for auth routes

// Start server
app.listen(PORT, () => console.log('Server running on port ${PORT}'));

const corsOptions = {
  origin: 'http://localhost:8080', // Adjust according to your frontend URL
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email, password, username } = req.body; // Add more fields if needed
  
    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
  
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
  
        // Create new user
        user = new User({ email, password: hashedPassword, username });
        await user.save();
  
        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
        res.status(201).json({ token, user: { id: user._id, email: user.email, username: user.username } });
    } catch (err) {
        console.error('Signup Error:', err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;