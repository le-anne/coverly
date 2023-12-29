<script>
  let email = '';
  let password = '';
  let confirmPassword = '';
  let errorMessage = '';

  const handleSubmit = async () => {
    // Reset the error message
    errorMessage = '';

    // Perform form validation
    if (email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
      errorMessage = 'Please fill in all fields.';
      return;
    }

    if (password !== confirmPassword) {
      errorMessage = 'Passwords do not match.';
      return;
    }

    // Assuming you have an API endpoint for user registration
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        errorMessage = data.error || 'Registration failed.';
        return;
      }

      // Registration successful, redirect to a success page or perform other actions
    } catch (error) {
      console.error('Error registering user:', error);
      errorMessage = 'An error occurred during registration.';
    }
  };
</script>

<div class="registration-form">
  <h2>Register</h2>
  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}
  <form on:submit={handleSubmit}>
    <label for="email">Email:</label>
    <input type="email" id="email" bind:value={email} required />

    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password} required />

    <label for="confirmPassword">Confirm Password:</label>
    <input type="password" id="confirmPassword" bind:value={confirmPassword} required />

    <button type="submit">Register</button>
  </form>
</div>

<style>
  /* Your CSS styles for the registration form */
  .registration-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .error {
    color: red;
  }
</style>
