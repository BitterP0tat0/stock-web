///////////////////////////////////////////////////////////////
///////////Dark Mode Button/////////////////////

const toggleBtn = document.getElementById("mode-toggle");
const body = document.body;

function setMode(mode) {
  body.classList.remove("light-mode", "dark-mode");
  body.classList.add(`${mode}-mode`);
  if (toggleBtn) {
    toggleBtn.textContent = mode === "dark" ? "Light Mode" : "Dark Mode";
  }
}

const savedMode = localStorage.getItem("mode") || "light";
setMode(savedMode);

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const currentMode = body.classList.contains("dark-mode") ? "dark" : "light";
    const newMode = currentMode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("mode", newMode);
    
    // 同步PersonalInfo页面的switch
    const toggleSwitch = document.getElementById("mode-toggle-switch");
    if (toggleSwitch) {
      toggleSwitch.checked = newMode === "dark";
    }
  });
}

// 监听PersonalInfo页面的switch变化
const toggleSwitch = document.getElementById("mode-toggle-switch");
if (toggleSwitch) {
  toggleSwitch.addEventListener("change", () => {
    const newMode = toggleSwitch.checked ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("mode", newMode);
  });
}

////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////
