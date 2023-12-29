const fastify = require('fastify')();
const connectToDatabase = require('./api/db'); // Import the database connection module
const usersRoute = require('./api/users'); // Import the user registration route module

fastify.register(require('fastify-cors'), {
  // Configure CORS if needed
});

// Register API routes
fastify.register(usersRoute, { prefix: '/api/users' });

// Start the Fastify server
const start = async () => {
  try {
    // Connect to the database
    const db = await connectToDatabase();

    // Listen to the port
    await fastify.listen(3000);
    console.log('Server is listening on port 3000');
  } catch (err) {
    console.error('Error starting the server:', err);
    process.exit(1);
  }
};

start();
