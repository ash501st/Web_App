const express = require('express');
const app = express();
const PORT = 3000;

// Tell Express to use EJS for rendering our HTML pages
app.set('view engine', 'ejs');

// Allow Express to read data sent from HTML forms
app.use(express.urlencoded({ extended: true }));

// In-memory data store (resets when server restarts)
let posts = [
    { id: 1, username: 'Garrus', content: 'Calibrating the forum servers right now.' },
    { id: 2, username: 'Wrex', content: 'Shepard.' }
];

let users = [
    { id: 1, username: 'Garrus', role: 'User' },
    { id: 2, username: 'Wrex', role: 'User' }
];


// 1. Main Feed Page
app.get('/', (req, res) => {
    // Passes the posts array straight into the HTML template
    res.render('feed', { posts: posts });
});

// 2. Moderation Page
app.get('/moderate', (req, res) => {
    // Passes the users array straight into the moderation view
    res.render('moderate', { users: users });
});


// Creates a new post from the feed form
app.post('/add-post', (req, res) => {
    const newPost = {
        id: posts.length + 1,
        username: req.body.username || 'Anonymous',
        content: req.body.content
    };
    posts.push(newPost);
    res.redirect('/'); // Refresh the feed page to show the new post
});

// Create a new user account from the feed form
app.post('/register', (req, res) => {
    const newUser = {
        id: users.length + 1,
        username: req.body.newUsername,
        role: 'User'
    };
    users.push(newUser);
    res.redirect('/'); // Send back to feed after registering
});

// Moderate/Delete a user account from the admin page
app.post('/delete-user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    // Filter out the deleted user
    users = users.filter(user => user.id !== userId);
    res.redirect('/moderate'); // Refresh moderation page
});

// Start server
app.listen(PORT, () => {
    console.log(`Forum app running smoothly at http://localhost:${PORT}`);
});