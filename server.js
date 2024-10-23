const Song = require('./models/song');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Routes
app.get('/test', (req, res) => {
    res.send('Server is running!');
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/songs/new', (req, res) => {
    res.render('new');
});

app.post('/songs', async (req, res) => {
    try {
        console.log('Request body:', req.body);  // Log the request body
        const newSong = await Song.create(req.body);
        console.log('New song created:', newSong);  // Log the newly created song
        res.redirect('/songs');
    } catch (err) {
        console.error('Error creating song:', err);  // Log the error
        res.send('Error creating song');
    }
});

// Route to display all songs
app.get('/songs', async (req, res) => {
    try {
        const songs = await Song.find();
        res.render('songs', { songs });
    } catch (err) {
        console.error('Error fetching songs:', err);
        res.send('Error fetching songs');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Check if MONGO_URI is defined
console.log('MongoDB URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));




