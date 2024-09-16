const express = require('express');
const app = express();
const path = require('path');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const searchRoutes = require('./routes/search');
app.use('/search', searchRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
