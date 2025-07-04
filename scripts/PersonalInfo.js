document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggle = document.getElementById("mode-toggle-switch");

  toggle?.addEventListener("change", () => {
    body.classList.toggle("dark-mode");
  });

  document.getElementById("mode-toggle")?.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    toggle.checked = body.classList.contains("dark-mode");
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
          document.querySelector("h3").textContent = data.fullName || "User";
          document.querySelector("p").innerHTML = `
            Username: User name<br />
            Email: ${data.email}
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

  // 初始化语言
  const lang = localStorage.getItem('lang') || 'en';
  loadLocale(lang).then(applyTranslations);

  // 语言切换事件
  // 监听所有 .lang-toggle 按钮
  setTimeout(() => {
    document.querySelectorAll('.lang-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        let selectedLang = btn.getAttribute('data-lang');
        if (!selectedLang) {
          selectedLang = btn.textContent.trim().toLowerCase();
        }
        setLanguage(selectedLang);
        // location.reload(); // 如需刷新页面可取消注释
      });
    });
  }, 100);
});
