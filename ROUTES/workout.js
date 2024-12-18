const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

router.get('/dashboard', async (req, res) => {
    const workouts = await Workout.find({ userId: req.session.userId });
    res.render('dashboard', { workouts });
});

router.get('/add-workout', (req, res) => res.render('add-workout'));

router.post('/add-workout', async (req, res) => {
    const { exercise, duration, caloriesBurned } = req.body;
    const newWorkout = new Workout({
        userId: req.session.userId,
        exercise,
        duration,
        caloriesBurned
    });
    await newWorkout.save();
    res.redirect('/dashboard');
});

router.post('/delete-workout/:id', async (req, res) => {
    await Workout.findByIdAndDelete(req.params.id);
    res.redirect('/dashboard');
});

module.exports = router;