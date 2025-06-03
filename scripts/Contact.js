const submit = document.getElementById("submitMsg");

submit.addEventListener("click", function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;

  const message = document.getElementById("message").value;

  if (name && email && message) {
    alert("Message sent successfully!");
    console.log({ name, email, message });
    // clean data after submission
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("message").value = "";
  } else {
    alert("Please fill out all fields.");
  }
});
