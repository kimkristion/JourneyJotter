// Define an asynchronous function for user logout
const logout = async () => {
  // Send a POST request to the '/api/users/logout' endpoint
  const response = await fetch('/api/users/logout', {
      method: 'POST', // Use the POST method for the request
      headers: { 'Content-Type': 'application/json' }, // Set request headers to indicate JSON content
  });

  // Check if the response status is OK (HTTP status code 200)
  if (response.ok) {
      // If the response is OK, redirect the user to the root URL
      document.location.replace('/');
  } else {
      // If the response is not OK, display an alert indicating the logout failure
      alert('Failed to log out.');
  }
};

// Attach an event listener to an HTML element with the ID 'logout'
document.querySelector('#logout').addEventListener('click', logout);

  