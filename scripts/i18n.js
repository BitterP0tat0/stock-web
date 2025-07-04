// scripts/i18n.js
export async function loadLocale(lang) {
  let base = '';
  if (window.location.pathname.includes('/pages/')) {
    base = '../../locales/';
  } else if (window.location.pathname.includes('/locales/')) {
    base = './';
  } else {
    base = './locales/';
  }
  const response = await fetch(`${base}${lang}.json`);
  return response.json();
}

export function applyTranslations(translations) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[key]) {
      el.setAttribute('placeholder', translations[key]);
    }
  });
  const lang = localStorage.getItem('lang') || 'en';
  const langMap = { en: 'EN', de: 'DE', fr: 'FR', es: 'ES', zh: 'CN' };
  const langBtn = document.getElementById('langDropdownBtn');
  if (langBtn) {
    langBtn.textContent = langMap[lang] || lang.toUpperCase();
  }
}

export function setLanguage(lang) {
  localStorage.setItem('lang', lang);
  loadLocale(lang).then(applyTranslations);
}

export function initI18n() {
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
      });
    });
  }, 100);
} 