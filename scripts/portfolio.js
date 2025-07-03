const modeToggle = document.getElementById("mode-toggle");
const contentDiv = document.querySelector(".content");
const btnAssets = document.getElementById("btn-assets");
const btnTransactions = document.getElementById("btn-transactions");

let assetDoughnutChartInstance = null;
let incomeLineChartInstance = null;

function getThemeColors() {
  const style = getComputedStyle(document.body);
  const isDark = document.body.classList.contains("dark-mode");
  return {
    textColor: style.getPropertyValue("--text-color").trim() || "#212529",
    bgColor: style.getPropertyValue("--bg-color").trim() || "#fff",
    cardBg: style.getPropertyValue("--card-bg-color").trim() || "#fff",
    cardText: style.getPropertyValue("--card-text-color").trim() || "#000",
    cardShadow:
      style.getPropertyValue("--card-shadow").trim() ||
      "0 0 15px rgba(0, 0, 0, 0.05)",
    navText: style.getPropertyValue("--nav-text-color").trim() || "#000",
    navActiveBg:
      style.getPropertyValue("--nav-active-bg-color").trim() || "#0d6efd",
    navActiveText:
      style.getPropertyValue("--nav-active-text-color").trim() || "#fff",
    btnBg: style.getPropertyValue("--button-bg-color").trim() || "#0d6efd",
    btnText: style.getPropertyValue("--button-text-color").trim() || "#fff",
    transactionHeaderBg:
      style.getPropertyValue("--transaction-header-bg-color").trim() ||
      "#e9f5ff",
    transactionRowBg:
      style.getPropertyValue("--transaction-row-bg-color").trim() || "#f9fbfe",
    gridColor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
  };
}

function applyThemeColors() {
  const colors = getThemeColors();

  contentDiv.style.color = colors.textColor;
  contentDiv.style.backgroundColor = colors.bgColor;

  contentDiv.querySelectorAll(".card").forEach((card) => {
    card.style.backgroundColor = colors.cardBg;
    card.style.color = colors.cardText;
    card.style.boxShadow = colors.cardShadow;
  });

  document.querySelectorAll(".nav-sidebar a.nav-link").forEach((link) => {
    link.style.color = colors.navText;
    if (link.classList.contains("active")) {
      link.style.backgroundColor = colors.navActiveBg;
      link.style.color = colors.navActiveText;
    } else {
      link.style.backgroundColor = "transparent";
    }
  });

  document.querySelectorAll("table thead").forEach((thead) => {
    thead.style.backgroundColor = colors.transactionHeaderBg;
    thead.style.color = colors.textColor;
  });

  document.querySelectorAll("table tbody tr").forEach((tr, i) => {
    tr.style.backgroundColor =
      i % 2 === 0 ? colors.transactionRowBg : colors.bgColor;
  });
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    modeToggle.textContent = "Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    modeToggle.textContent = "Dark Mode";
    localStorage.setItem("theme", "light");
  }
  applyThemeColors();
  // 主题切换后，重新渲染当前页面内容（防止图表颜色不刷新）
  if (btnAssets.classList.contains("active")) {
    showAssets();
  } else if (btnTransactions.classList.contains("active")) {
    showTransactions();
  }
}

modeToggle.addEventListener("click", toggleTheme);

function clearActive() {
  document
    .querySelectorAll(".nav-sidebar a.nav-link")
    .forEach((a) => a.classList.remove("active"));
}

function showAssets() {
  clearActive();
  btnAssets.classList.add("active");

  const colors = getThemeColors();

  const totalAssetsUSD = 125000;
  const growthPercent = 8.7;
  const growthUp = true;

  const stocks = [
    {
      name: "Apple",
      price: 175.32,
      changePercent: 1.25,
      up: true,
      ratio: 0.48,
    },
    {
      name: "Google",
      price: 2834.5,
      changePercent: -0.85,
      up: false,
      ratio: 0.3,
    },
    {
      name: "Facebook",
      price: 332.14,
      changePercent: 0.45,
      up: true,
      ratio: 0.22,
    },
  ];

  const assetBreakdown = {
    labels: stocks.map((s) => s.name),
    datasets: [
      {
        data: stocks.map((s) => (s.ratio * 100).toFixed(2)),
        backgroundColor: ["#0d6efd", "#198754", "#ffc107"],
        hoverOffset: 30,
      },
    ],
  };

  const stockCardsHtml = stocks
    .map(
      (stock) => `
    <div class="col-md-4 mb-3">
    <div class="card" style="box-shadow: var(--card-shadow);">
      <div class="card-body">
        <h5 class="card-title">${stock.name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">$${stock.price.toFixed(
          2
        )}</h6>
        <p class="card-text text-${stock.up ? "success" : "danger"}">
          <i class="bi bi-arrow-${stock.up ? "up" : "down"}"></i>
          ${stock.changePercent.toFixed(2)}%
        </p>
      </div>
    </div>
  </div>
`
    )
    .join("");

  contentDiv.innerHTML = `
    <h3 class="p-3">My Stocks</h3>
    <div class="card shadow-sm mb-4">
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <h5>Total Assets (USD)</h5>
            <h2>$${totalAssetsUSD.toLocaleString()}</h2>
            <p class="mb-0 text-${growthUp ? "success" : "danger"}">
              <i class="bi bi-arrow-${growthUp ? "up" : "down"}"></i>
              ${growthPercent}% ${growthUp ? "Increase" : "Decrease"} (MoM)
            </p>
          </div>
          <div class="col-md-6">
            <h5>Held Stocks</h5>
            <div class="row">${stockCardsHtml}</div>
          </div>
        </div>
      </div>
      <div class="shadow-sm mb-4">
        <div class="card-body d-flex justify-content-center">
          <div style="max-width: 300px; width: 100%;">
            <canvas id="assetDoughnutChart"></canvas>
          </div>
        </div>
      </div>
    </div>
    <div class="card shadow-sm">
      <div class="card-body">
        <h5 class="card-title">Income Analysis</h5>
        <canvas id="incomeLineChart" style="width: 100%; max-height: 300px;"></canvas>
      </div>
    </div>
  `;

  applyThemeColors();

  // 销毁旧图表，防止叠加
  if (assetDoughnutChartInstance) {
    assetDoughnutChartInstance.destroy();
  }
  if (incomeLineChartInstance) {
    incomeLineChartInstance.destroy();
  }

  // 创建 doughnut 图表
  const doughnutCtx = document
    .getElementById("assetDoughnutChart")
    .getContext("2d");
  assetDoughnutChartInstance = new Chart(doughnutCtx, {
    type: "doughnut",
    data: assetBreakdown,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: colors.textColor, // 这里颜色生效
          },
        },
        tooltip: {
          callbacks: {
            label: (context) => `${context.label}: ${context.parsed}%`,
          },
          bodyColor: colors.textColor,
          titleColor: colors.textColor,
          backgroundColor: colors.cardBg,
        },
      },
    },
  });

  // 创建折线图
  const incomeData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Income",
        data: [1200, 1500, 1400, 1800, 1700, 1600, 1900],
        borderColor: "#0d6efd",
        backgroundColor: "rgba(13, 110, 253, 0.3)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const incomeCtx = document.getElementById("incomeLineChart").getContext("2d");
  incomeLineChartInstance = new Chart(incomeCtx, {
    type: "line",
    data: incomeData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: { color: colors.textColor },
          grid: { color: colors.gridColor },
        },
        y: {
          ticks: { color: colors.textColor },
          grid: { color: colors.gridColor },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: colors.textColor,
          },
        },
      },
    },
  });
}

function showTransactions() {
  clearActive();
  btnTransactions.classList.add("active");

  const transactions = [
    { date: "2025-06-01", type: "Buy", asset: "Apple", amount: 10000 },
    { date: "2025-06-05", type: "Sell", asset: "Google", amount: 5000 },
    { date: "2025-06-10", type: "Buy", asset: "Facebook", amount: 20000 },
  ];

  // 销毁资产页图表，释放资源
  if (assetDoughnutChartInstance) {
    assetDoughnutChartInstance.destroy();
    assetDoughnutChartInstance = null;
  }
  if (incomeLineChartInstance) {
    incomeLineChartInstance.destroy();
    incomeLineChartInstance = null;
  }

  const rows = transactions
    .map(
      (t) => `
    <tr>
      <td>${t.date}</td>
      <td>${t.type}</td>
      <td>${t.asset}</td>
      <td>${t.amount.toLocaleString()} USD</td>
    </tr>
  `
    )
    .join("");

  contentDiv.innerHTML = `
    <h3>Transactions</h3>
    <table class="table table-striped table-hover mt-3">
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Asset</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;

  applyThemeColors();
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    modeToggle.textContent = "Light Mode";
  } else {
    modeToggle.textContent = "Dark Mode";
  }

  applyThemeColors();
  showAssets();

  btnAssets.addEventListener("click", (e) => {
    e.preventDefault();
    showAssets();
  });

  btnTransactions.addEventListener("click", (e) => {
    e.preventDefault();
    showTransactions();
  });
});
