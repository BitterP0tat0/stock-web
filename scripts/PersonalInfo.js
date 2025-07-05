document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggle = document.getElementById("mode-toggle-switch");

  // 初始化switch状态
  const savedMode = localStorage.getItem("mode") || "light";
  if (toggle) {
    toggle.checked = savedMode === "dark";
  }

  // 监听switch变化
  toggle?.addEventListener("change", () => {
    const newMode = toggle.checked ? "dark" : "light";
    body.classList.remove("light-mode", "dark-mode");
    body.classList.add(`${newMode}-mode`);
    localStorage.setItem("mode", newMode);
  });

  
  async function fetchUserInfo() {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in.");
      window.location.href = "../login/login.html";
    } else {
      fetch("https://stock-market-api-zw2g.onrender.com/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (!res.ok) throw new Error("Unauthorized");
          return res.json();
        })
        .then(data => {
          // Inject into the page
          document.querySelector("h4").textContent = data.fullName || "User";
          document.querySelector("h4").innerHTML = `
            ${data.email}
          `;
        })
        .catch(err => {
          console.error(err);
          alert("Session expired. Please log in again.");
          localStorage.removeItem("token");
          window.location.href = "../login/login.html";
        });
    }
  }

  fetchUserInfo();

  async function loadLocale(lang) {
    const response = await fetch(`../../locales/${lang}.json`);
    return response.json();
  }

  function applyTranslations(translations) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });
  }

  function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    loadLocale(lang).then(applyTranslations);
  }

  const lang = localStorage.getItem('lang') || 'en';
  loadLocale(lang).then(applyTranslations);

 
  setTimeout(() => {
    document.querySelectorAll('.lang-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        let selectedLang = btn.getAttribute('data-lang');
        if (!selectedLang) {
          selectedLang = btn.textContent.trim().toLowerCase();
        }
        setLanguage(selectedLang);
        // location.reload(); // 
      });
    });
  }, 100);
});
