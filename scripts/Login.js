import Signin from "../Dto/Signin.js";
const Login = document.getElementById("login");

Login.addEventListener("click", function (event) {
  event.preventDefault();
  const username = document.getElementById("loginUserName").value;
  const password = document.getElementById("InputPassword").value;

  try {
    if (username && password) {
      const user = new Signin(username, password);

      if (user.getUsername() === "123" && user.getPassword() === "123") {
        alert("Login successful!");
        console.log(`Username: ${user.getUsername()}`);
        document.getElementById("loginUserName").value = "";
        document.getElementById("InputPassword").value = "";
      } else {
        alert("Invalid username or password.");
      }
    } else {
      alert("Please fill in both fields.");
    }
  } catch (error) {
    alert(error.message);
  }
});
