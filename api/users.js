const bcrypt = require('bcryptjs'); // For password hashing
const connectToDatabase = require('../db/mongodb');  // Import the database connection module

module.exports = async (fastify, options) => {
  // Define the user registration route
  fastify.post('/register', async (request, reply) => {
    try {
      const db = await connectToDatabase();

      // Parse the request body to get user registration data (email, password)
      const { email, password } = request.body;

      // Implement registration logic, including password hashing and database insertion
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

      // Insert the user data into the database (using the db variable)

      // Respond with a success message or error message
      return { message: 'User registered successfully' };
    } catch (error) {
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  });
};
