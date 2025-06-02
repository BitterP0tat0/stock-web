///////////////////////////////////////////////////////////////
///////////Dark Mode Button/////////////////////

const toggleBtn = document.getElementById("mode-toggle");
const body = document.body;

toggleBtn.addEventListener("click", () => {
  if (body.classList.contains("light-mode")) {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");

    toggleBtn.textContent = "Light Mode";
  } else {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");

    toggleBtn.textContent = "Dark Mode";
  }
});

////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////
