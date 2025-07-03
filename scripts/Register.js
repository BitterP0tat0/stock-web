import Signup from '../Dto/Signup.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form.form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('registerEmail').value.trim();
    const username = document.getElementById('registerUserName').value.trim();
    const password = document.getElementById('InputPassword1').value.trim();

    try {
      const user = new Signup(email, username, password);

      const response = await fetch('https://stock-market-api-zw2g.onrender.com/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.getName(),
          email: user.getEmail(),
          password: user.getPassword(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Register failed: ${errorData.message || 'Unknown error'}`);
        return;
      }

      alert('Register successful!');
      window.location.href = '../login/login.html';
    } catch (error) {
      alert('Error: ' + error.message);
    }
  });
});
