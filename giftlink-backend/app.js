// API - Part 1 - Task 1: Import giftRoutes
const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');

// API - Part 2 - Task 2: Use giftRoutes for '/api/gifts' path
app.use('/api/gifts', giftRoutes);

//  API - Part 2 - Task 1: Import searchRoutes
app.use('/api/search', searchRoutes);

//  API - Part 2 - Task 2: Use searchRoutes for '/api/search' path
{{insert code here}}
