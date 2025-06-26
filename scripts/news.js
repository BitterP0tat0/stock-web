const newsData = [
  {
    title: "Stock Market Update 1: Company A hits new high",
    description: "Summary: Company A shows strong quarterly earnings growth.",
    link: "https://example-stocknews.com/article/1"
  },
  {
    title: "Stock Market Update 2: Company B announces dividend",
    description: "Company B declares a quarterly dividend increase.",
    link: "https://example-stocknews.com/article/2"
  },
  {
    title: "Stock Market Update 3: Company C expands internationally",
    description: "Company C opens new offices overseas.",
    link: "https://example-stocknews.com/article/3"
  },
  {
    title: "Stock Market Update 4: Company D faces regulatory challenges",
    description: "Company D deals with new government policies.",
    link: "https://example-stocknews.com/article/4"
  },
  {
    title: "Stock Market Update 5: Company E partners with startup",
    description: "Company E invests in emerging technologies.",
    link: "https://example-stocknews.com/article/5"
  },
  {
    title: "Stock Market Update 6: Company F quarterly earnings beat expectations",
    description: "Company F reports record profits this quarter.",
    link: "https://example-stocknews.com/article/6"
  },
  {
    title: "Stock Market Update 7: Company G launches new product line",
    description: "Company G enters new market segments.",
    link: "https://example-stocknews.com/article/7"
  },
];
const itemsPerPage = 5;
let currentPage = 1;

const newsContainer = document.getElementById('news-container');
const paginationContainer = document.getElementById('pagination');

function renderNews(page) {
  newsContainer.innerHTML = '';
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentNews = newsData.slice(start, end);

  currentNews.forEach(item => {
    const div = document.createElement('div');
    div.className = 'card mb-4 shadow-sm'; 
    div.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text">${item.description}</p>
        <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Read More</a>
      </div>
    `;
    newsContainer.appendChild(div);
  });
}

function renderPagination() {
  paginationContainer.innerHTML = '';

  const pageCount = Math.ceil(newsData.length / itemsPerPage);

  const ul = document.createElement('ul');
  ul.className = 'pagination justify-content-center';

  for (let i = 1; i <= pageCount; i++) {
    const li = document.createElement('li');
    li.className = 'page-item' + (i === currentPage ? ' active' : '');

    const btn = document.createElement('button');
    btn.className = 'page-link';
    btn.textContent = i;
    btn.addEventListener('click', () => {
      currentPage = i;
      renderNews(currentPage);
      renderPagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    li.appendChild(btn);
    ul.appendChild(li);
  }

  paginationContainer.appendChild(ul);
}

renderNews(currentPage);
renderPagination();


const toggleBtn = document.getElementById("mode-toggle");
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  toggleBtn.textContent = 'Light Mode';
} else {
  body.classList.add('light-mode');
  toggleBtn.textContent = 'Dark Mode';
}

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
