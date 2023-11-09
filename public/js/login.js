const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/home');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  console.log('Username:', username);
  console.log('Email:', email);
  console.log('Password:', password);

  if (username && email && password) {
    try {
      const response = await fetch('/signup', { // Update the target to /signup
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }), // Include 'username' in the body
      });

      if (response.ok) {
        document.location.replace('/login'); // Redirect to the profile page or any other appropriate page
        alert('Registration Success!');
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
};

document
  .querySelector('.login-form') // Update this to '.login-form' if it's the correct class
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);




























// document.addEventListener("DOMContentLoaded", function () {
//   const loginForm = document.querySelector(".login-form");
//   const signupForm = document.querySelector(".signup-form");

//   const registeredUsers = [];

//   signupForm.addEventListener("submit", async function (event) {
//     event.preventDefault();

//     const usernameInput = document.getElementById("username-signup").value;
//     const emailInput = document.getElementById("email-signup").value;
//     const passwordInput = document.getElementById("password-signup").value;

//     try {
//       const response = await fetch('/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: usernameInput,
//           email: emailInput,
//           password: passwordInput,
//         }),
//       });

//       if (response.status === 201) {
//         // Registration was successful
//         signupForm.reset();
//         alert("Registration successful! You can now log in.");
//       } else if (response.status === 400) {
//         // Handle validation errors or invalid data
//         console.error('Invalid data');
//       } else {
//         // Handle other registration failures
//         console.error('Registration failed');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   });



//   loginForm.addEventListener("submit", function (event) {
//     event.preventDefault();

//     const emailInput = document.getElementById("email-login").value;
//     const passwordInput = document.getElementById("password-login").value;

//     // Validate the login using the registered user data
//     if (validateLogin(emailInput, passwordInput)) {
//       window.location.href = "/home";
//     } else {
//       alert("Invalid login credentials. Please try again.");
//     }
//   });



//   function validateLogin(email, password) {
//     for (const user of registeredUsers) {
//       if (user.email === email && user.password === password) {
//         return true;
//       }
//     }
//     return false;
//   }

//   function highlightInput(inputId) {
//     const inputElement = document.getElementById(inputId);
//     inputElement.style.borderColor = "red";
//     alert(`Invalid ${inputElement.placeholder}`);
//   }
// });
