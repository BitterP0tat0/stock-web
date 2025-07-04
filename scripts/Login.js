import Signin from "../Dto/Signin.js";

const Login = document.getElementById("login");

Login.addEventListener("click", async function (event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("InputPassword").value;

  try {
    if (email && password) {
      const user = new Signin(email, password);

      const response = await fetch("https://stock-market-api-zw2g.onrender.com/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.getEmail(),
          password: user.getPassword(),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed.");
      }

      const data = await response.json();

      localStorage.setItem("token", data.access_token);

      console.log(`Token: ${data.access_token}`);

      document.getElementById("loginEmail").value = "";
      document.getElementById("InputPassword").value = "";
      window.location.href =
        "../stock_trade/main.html?email=" +
        encodeURIComponent(user.getEmail());
    } else {
      alert("Please fill in both fields.");
    }
  } catch (error) {
    alert(error.message || "An error occurred.");
  }
});
