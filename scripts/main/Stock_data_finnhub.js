
  const socket = io('http://localhost:8080/finnhub', {
    transports: ['websocket'],
  });

  const tradeTableContainer = document.getElementById('tradeTableContainer');
  const paginationContainer = document.getElementById('pagination');
  const balance = document.getElementById('balance');
  const username = new URLSearchParams(window.location.search).get('username');
  const canvas = document.getElementById('tradeChart');
  const container = document.getElementById('tradeChartContainer');

  const symbolsToSubscribe = [
    'AAPL','GOOGL','MSFT','AMZN','TSLA','FB','NFLX','NVDA','BABA','INTC',
    'ORCL','CSCO','ADBE','PYPL','CRM','AMD','SQ','UBER','TWTR','SHOP',
    'SPOT','V','MA','DIS','BAC','WMT','T','KO','PEP','NKE','XOM','CVX',
    'JNJ','PFE','MRK','ABBV','COST','MCD','QCOM','TXN','IBM','GS','JPM',
    'BA','CAT','GM','F','GE','GM','NIO','BINANCE:BTCUSDT','IC MARKETS:1'
  ];

  const latestTradesBySymbol = {};
  symbolsToSubscribe.forEach(symbol => {
    latestTradesBySymbol[symbol] = {
      s: symbol,
      p: 0.0,
      t: null,
      v: 0.0
    };
  });

  let currentPage = 1;
  const itemsPerPage = 9;

  const mockChartData = {
    AAPL: {
      labels: ['2025-06-01','2025-06-02','2025-06-03','2025-06-04','2025-06-05','2025-06-06','2025-06-07'],
      prices: [150, 152, 153, 151, 154, 156, 157]
    },
    NVDA: {
      labels: ['2025-06-01','2025-06-02','2025-06-03','2025-06-04','2025-06-05','2025-06-06','2025-06-07'],
      prices: [270, 272, 275, 273, 276, 278, 280]
    },
    GOOGL: {
      labels: ['2025-06-01','2025-06-02','2025-06-03','2025-06-04','2025-06-05','2025-06-06','2025-06-07'],
      prices: [270, 272, 275, 293, 256, 580, 390]
    }
  };

  const ctx = document.getElementById('tradeChart').getContext('2d');
  let tradeChart;

  function renderChart(symbol) {
    const data = mockChartData[symbol];
    if (!data) return;
    if(tradeChart != null) tradeChart.destroy();

    tradeChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [{
          label: `${symbol} Close Price`,
          data: data.prices,
          borderColor: 'rgba(54, 162, 235, 0.8)',
          backgroundColor: 'rgba(54, 162, 235, 0.3)',
          fill: true,
          tension: 0.3,
          pointRadius: 7
        }]
      },
 
    });
  }
  
  function renderTradesTable() {
    const symbols = Object.keys(latestTradesBySymbol);
    if (symbols.length === 0) {
      tradeTableContainer.innerHTML = '<p class="text-muted">No trades to display.</p>';
      paginationContainer.innerHTML = '';
      return;
    }

    const tradesArray = symbols.map(sym => latestTradesBySymbol[sym]);
    const totalPages = Math.ceil(tradesArray.length / itemsPerPage);

    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const start = (currentPage - 1) * itemsPerPage;
    const pageTrades = tradesArray.slice(start, start + itemsPerPage);

    const cardsHtml = pageTrades.map(trade => `
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">${trade.s}</h5>
            <p class="card-text">
              <strong>Price:</strong> $${trade.p} <br>
              <strong>Volume:</strong> ${trade.v} <br>
              <strong>Time:</strong> ${trade.t ? new Date(trade.t).toLocaleString() : ''}
            </p>
            <button class="btn btn-sm btn-secondary" onclick="showDetails('${trade.s}')">Details</button>
          </div>
        </div>
      </div>
    `).join('');

    tradeTableContainer.innerHTML = `<div class="row">${cardsHtml}</div>`;
    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    if (totalPages <= 1) {
      paginationContainer.innerHTML = '';
      return;
    }
    let html = `<button class="btn btn-sm btn-primary me-2" ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1})">Previous</button>`;

    const maxButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = startPage + maxButtons - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for(let i = startPage; i <= endPage; i++) {
      html += `<button class="btn btn-sm me-1 ${i === currentPage ? 'btn-primary' : 'btn-outline-primary'}" onclick="goToPage(${i})">${i}</button>`;
    }
    html += `<button class="btn btn-sm btn-primary ms-2" ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1})">Next</button>`;
    paginationContainer.innerHTML = html;
  }

  function goToPage(page) {
    currentPage = page;
    renderTradesTable();
  }

  function showDetails(symbol) {
    window.location.href = `../chart/chart.html?symbol=${encodeURIComponent(symbol)}&username=${encodeURIComponent(username)}`;
  }

  socket.on('trades', (data) => {
    data.forEach(trade => {
      latestTradesBySymbol[trade.s] = trade;
    });
    renderTradesTable();
  });

  document.getElementById('btnAAPL').addEventListener('click', () => {
    renderChart('AAPL');
    setActiveButton('btnAAPL');
  });
  document.getElementById('btnNVDA').addEventListener('click', () => {
    renderChart('NVDA');
    setActiveButton('btnNVDA');
  });

  
  document.getElementById('btnGOOGL').addEventListener('click', () => {
    renderChart('GOOGL');
    setActiveButton('btnGOOGL');
  });

  function setActiveButton(activeId) {
    ['btnAAPL', 'btnNVDA', 'btnGOOGL'].forEach(id => {
      const btn = document.getElementById(id);
      if (id === activeId) {
        btn.classList.replace('btn-outline-primary', 'btn-primary');
      } else {
        btn.classList.replace('btn-primary', 'btn-outline-primary');
      }
    });
  }

  const form = document.getElementById('searchForm');
  const input = document.getElementById('tradeSearchInput');

    form.addEventListener('submit', function (e) {
      e.preventDefault(); 
      const value = input.value.trim().toUpperCase();
      console.log('The content is:', value);
      showDetails(value);
    });


window.addEventListener('DOMContentLoaded', () => {
  renderChart('AAPL');
  setActiveButton('btnAAPL');
  renderTradesTable();
});