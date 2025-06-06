import Signin from "../Dto/Signin.js";

const Login = document.getElementById("login");

Login.addEventListener("click", async function (event) {
  event.preventDefault();
  const username = document.getElementById("loginUserName").value;
  const password = document.getElementById("InputPassword").value;

  try {
    if (username && password) {
      const user = new Signin(username, password);

      const response = await fetch("http://localhost:8080/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: user.getUsername(),
          password: user.getPassword()
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed.");
      }

      const data = await response.json();

      localStorage.setItem("token", data.access_token);

      alert("Login successful!");
      console.log(`Token: ${data.access_token}`);

      document.getElementById("loginUserName").value = "";
      document.getElementById("InputPassword").value = "";
      window.location.href = '../stock_trade/main.html?username=' + encodeURIComponent(user.getUsername());

    } else {
      alert("Please fill in both fields.");
    }
  } catch (error) {
    alert(error.message || "An error occurred.");
  }
});
