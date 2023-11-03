document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector(".login-form");
    const signupForm = document.querySelector(".signup-form");
  
    signupForm.addEventListener("submit", async function (event) {
      event.preventDefault();
  
    //   const usernameInput = document.getElementById("username-signup").value;
      const emailInput = document.getElementById("email-signup").value;
      const passwordInput = document.getElementById("password-signup").value;
  
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        //   username: usernameInput,
          email: emailInput,
          password: passwordInput,
        }),
      });
  
      if (response.ok) {
        signupForm.reset();
        alert("Registration successful! You can now log in.");
      } else {
        alert("Registration failed. Please try again.");
      }
    });
  
    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault();
  
      const emailInput = document.getElementById("email-login").value;
      const passwordInput = document.getElementById("password-login").value;
  
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput,
        }),
      });
  
      if (response.ok) {
        document.location.replace('/Layouts/main/handlebars');
      } else {
        alert("Invalid login credentials. Please try again.");
      }
    });
  }); 
  