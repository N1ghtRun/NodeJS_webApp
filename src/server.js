const app = require('./app');
const connectDB = require('./utils/database'); // Import the connectDB function
const port = process.env.PORT || 3002;


// Establish the database connection first
connectDB().then(() => {
    // Start the server only after the database connection is established
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((error) => {
    console.error('Database connection failed. Exiting now...', error);
    process.exit(1);
});
