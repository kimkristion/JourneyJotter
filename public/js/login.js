// Function to handle the login form submission
const loginFormHandler = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the user's email and password from the form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // Check if both email and password are provided
    if (email && password) {
        // Send a POST request to the '/api/users/login' endpoint with user credentials
        const response = await fetch('/api/users/login', {
            method: 'POST', // Use the POST method for the request
            body: JSON.stringify({ email, password }), // Send user data as JSON
            headers: { 'Content-Type': 'application/json' }, // Set request headers
        });

        // Check if the login request was successful (HTTP status code 200)
        if (response.ok) {
            // If successful, redirect the user to the root URL
            document.location.replace('/');
        } else {
            // If the login request failed, show an alert
            alert('Failed to log in.');
        }
    }
};

// Function to handle the signup form submission
const signupFormHandler = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If the sign-up request was successful, extract and use the response data.
            const userData = await response.json(); // Parse the response as JSON

            // Now, you can use the 'userData' in your model
            // For example, you can log it or pass it to another function
            console.log(userData);

            // You can also pass 'userData' to a model or perform other operations with it
            // modelFunction(userData);
        } else {
            alert('Failed to sign up.');
        }
    }
};


// Attach event listeners to the login and signup forms
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
