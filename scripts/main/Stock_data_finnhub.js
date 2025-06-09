 const socket = io('http://localhost:8080/finnhub', {
      transports: ['websocket'],
    });
const tradeTableContainer = document.getElementById('tradeTableContainer');
const paginationContainer = document.getElementById('pagination');
const latestTradesBySymbol = {}; 
const balance = document.getElementById('balance');
const username = new URLSearchParams(window.location.search).get('username');


let currentPage = 1;
const itemsPerPage = 10;
function renderTradesTable() {
  const symbols = Object.keys(latestTradesBySymbol);
  if (symbols.length === 0) {
    tradeTableContainer.innerHTML = '<p class="text-muted">No trades to display.</p>';
    paginationContainer.innerHTML = '';
    return;
  }

  const tradesArray = Array.from(symbols, symbol => latestTradesBySymbol[symbol]);

  const totalPages = Math.ceil(tradesArray.length / itemsPerPage);
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageTrades = tradesArray.slice(startIndex, endIndex);

  const rowsHtml = pageTrades.map(trade => {
    return `
      <tr>
        <td>${trade.s}</td>
        <td>$${trade.p}</td>
        <td>${trade.t ? new Date(trade.t).toLocaleString() : ''}</td>
        <td>${trade.v}</td>
        <td><button class="btn btn-sm btn-secondary" onclick="showDetails('${trade.s}')">Details</button></td>
      </tr>
    `;
  }).join('');

  const tableHtml = `
    <table class="table table-striped table-bordered">
      <thead class="table-dark">
        <tr>
          <th>Symbol</th>
          <th>Price</th>
          <th>Time</th>
          <th>Volume</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    </table>
  `;

  tradeTableContainer.innerHTML = tableHtml;

  renderPagination(totalPages);
}


function renderPagination(totalPages) {
  if (totalPages <= 1) {
    paginationContainer.innerHTML = '';
    return;
  }

  let buttonsHtml = '';

  buttonsHtml += `<button class="btn btn-sm btn-primary me-2" ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1})">Previous</button>`;

  const maxButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endPage = startPage + maxButtons - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    buttonsHtml += `<button class="btn btn-sm me-1 ${i === currentPage ? 'btn-primary' : 'btn-outline-primary'}" onclick="goToPage(${i})">${i}</button>`;
  }

  buttonsHtml += `<button class="btn btn-sm btn-primary ms-2" ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1})">Next</button>`;

  paginationContainer.innerHTML = buttonsHtml;
}

function goToPage(page) {
  currentPage = page;
  renderTradesTable();
}
function showDetails(symbol) {
  const trade = latestTradesBySymbol[symbol];
  if (!trade) return;
  window.location.href = `../chart/chart.html?symbol=${encodeURIComponent(symbol)}&username=${encodeURIComponent(username)}`;
}
socket.on('trades', (data) => {
  data.forEach(trade => {
    latestTradesBySymbol[trade.s] = trade;
  });
  renderTradesTable();
});
