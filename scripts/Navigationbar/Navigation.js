
///////////////////////////////////////////////////////////////
///////////Dark Mode Button/////////////////////

  const toggleBtn = document.getElementById("mode-toggle");
  const body = document.body;
  const nav = document.querySelector("nav.navigation");
  const footer = document.querySelector("footer");

  toggleBtn.addEventListener("click", () => {
    if (body.classList.contains("light-mode")) {
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");

      nav.classList.remove("light-mode");
      nav.classList.add("dark-mode");

      footer.classList.remove("light-mode");
      footer.classList.add("dark-mode");

      toggleBtn.textContent = "Light Mode";
    } else {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");

      nav.classList.remove("dark-mode");
      nav.classList.add("light-mode");

      footer.classList.remove("dark-mode");
      footer.classList.add("light-mode");

      toggleBtn.textContent = "Dark Mode";
    }
  });


////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////