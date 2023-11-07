document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".login-form");
  const signupForm = document.querySelector(".signup-form");

  const registeredUsers = [];

  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const usernameInput = document.getElementById("username-signup").value;
    const emailInput = document.getElementById("email-signup").value;
    const passwordInput = document.getElementById("password-signup").value;

    // Check if the username, email, and password meet the criteria
    const isValidUsername = usernameInput.length === 8;
    const isValidEmail = emailInput.toLowerCase().includes("@gmail.com");
    const isValidPassword =
      /[A-Z]/.test(passwordInput) && /[a-z]/.test(passwordInput) && /[^A-Za-z0-9]/.test(passwordInput);

    if (!isValidUsername) {
      highlightInput("username-signup");
    }

    if (!isValidEmail) {
      highlightInput("email-signup");
    }

    if (!isValidPassword) {
      highlightInput("password-signup");
    }

    if (isValidUsername && isValidEmail && isValidPassword) {
      registeredUsers.push({ username: usernameInput, email: emailInput, password: passwordInput });
      signupForm.reset();
      alert("Registration successful! You can now log in.");
    }
  });

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const emailInput = document.getElementById("email-login").value;
    const passwordInput = document.getElementById("password-login").value;

    // Validate the login using the registered user data
    if (validateLogin(emailInput, passwordInput)) {
      window.location.href = "/home";
    } else {
      alert("Invalid login credentials. Please try again.");
    }
  });

  

  function validateLogin(email, password) {
    for (const user of registeredUsers) {
      if (user.email === email && user.password === password) {
        return true;
      }
    }
    return false;
  }

  function highlightInput(inputId) {
    const inputElement = document.getElementById(inputId);
    inputElement.style.borderColor = "red";
    alert(`Invalid ${inputElement.placeholder}`);
  }
});
