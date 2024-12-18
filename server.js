const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('connect-flash');

const authRoutes = require('./routes/auth');
const workoutRoutes = require('./routes/workout');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'fitness-secret', resave: false, saveUninitialized: true }));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// View Engine
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/fitness-tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

// Routes
app.use(authRoutes);
app.use(workoutRoutes);

app.get('/', (req, res) => res.redirect('/login'));

// Start Server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));