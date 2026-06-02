const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Import routes
const scraperRoutes = require('./routes/scraper');
const analyticsRoutes = require('./routes/analytics');

// Routes
app.use('/api/scraper', scraperRoutes);
app.use('/api/analytics', analyticsRoutes);

// Home page
app.get('/', (req, res) => {
  res.render('dashboard');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
