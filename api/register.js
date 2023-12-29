// src/routes/api/register.js

// Import Fastify
import { fastify } from '$app/fastify';

// Define the route
fastify.post('/api/register', async (request, reply) => {
  try {
    // Extract user registration data from the request body
    const { email, password } = request.body;

    // Perform user registration logic here (e.g., database insertion)
    // Replace this with your actual registration logic

    // For demonstration purposes, let's assume registration was successful
    // In a real application, you should handle registration failures and errors
    const user = {
      email,
      // You can hash the password and save it securely in your database
      // Here, we're just saving the plaintext password for demonstration
      password,
    };

    // Send a success response with the registered user data
    return reply.send({ user, message: 'Registration successful' });
  } catch (error) {
    // Handle errors and send an error response
    console.error('Error registering user:', error);
    return reply.status(500).send({ error: 'Registration failed' });
  }
});
