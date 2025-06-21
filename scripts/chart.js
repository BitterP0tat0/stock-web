// APJKM04Q8Q5VU2W7 another API key for Alpha Vantage
// 7iuvkjj3japk0g2g is the API key used in this
const apiKey = "APJKM04Q8Q5VU2W7";
const h1 = document.querySelector("h1");
const symbol = new URLSearchParams(window.location.search).get("symbol") || "MSFT";
const ctx = document.getElementById("closePriceChart").getContext("2d");
const toggleBtn = document.getElementById("mode-toggle");
const body = document.body;
let chartInstance = null;
let cachedData = { labels: [], closePrices: [], openPrices: [] };

h1.textContent = `Stock Chart for ${symbol.toUpperCase()}`;

function formatDate(dateStr, type) {
  const [year, month, day] = dateStr.split("-");
  if (type === "daily") return `${month}/${day}/${year}`;
  if (type === "monthly") return `${month}/${year}`;
  return year;
}

function getChartColors() {
  const style = getComputedStyle(document.body);
  return {
    textColor: style.getPropertyValue("--text-color").trim(),
    bgColor: style.getPropertyValue("--chart-bg-color").trim(),
  };
}

function renderChart() {
  const { textColor, bgColor } = getChartColors();
  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: cachedData.labels,
      datasets: [
        {
          label: "Close Price (USD)",
          data: cachedData.closePrices,
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: "Open Price (USD)",
          data: cachedData.openPrices,
          borderColor: "#f87171",
          backgroundColor: "rgba(248, 113, 113, 0.2)",
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: textColor,
            font: { size: 14 },
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Date (MM/DD/YYYY)",
            color: textColor,
          },
          ticks: { color: textColor },
          grid: { color: bgColor },
        },
        y: {
          title: {
            display: true,
            text: "Price in USD",
            color: textColor,
          },
          ticks: { color: textColor },
          grid: { color: bgColor },
          beginAtZero: false,
        },
      },
    },
  });
}

function loadChart(type) {
  let functionType = "TIME_SERIES_DAILY";
  if (type === "monthly") functionType = "TIME_SERIES_MONTHLY";
  else if (type === "yearly") functionType = "TIME_SERIES_MONTHLY";

  const url = `https://www.alphavantage.co/query?function=${functionType}&symbol=${symbol}&apikey=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let timeSeries =
        type === "daily"
          ? data["Time Series (Daily)"]
          : data["Monthly Time Series"];

      if (!timeSeries) {
        alert("API error or limit reached.");
        return;
      }

      let rawDates = Object.keys(timeSeries);
      if (type === "yearly")
        rawDates = rawDates.filter((d) => d.includes("-01-")).slice(0, 10);
      else rawDates = rawDates.slice(0, 10);
      rawDates = rawDates.reverse();

      cachedData.labels = rawDates.map((date) => formatDate(date, type));
      cachedData.closePrices = rawDates.map((date) =>
        parseFloat(timeSeries[date]["4. close"])
      );
      cachedData.openPrices = rawDates.map((date) =>
        parseFloat(timeSeries[date]["1. open"])
      );

      renderChart();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to fetch data.");
    });
}

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  toggleBtn.textContent = body.classList.contains("dark-mode")
    ? "Light Mode"
    : "Dark Mode";

  renderChart(); 
});

window.addEventListener("DOMContentLoaded", () => {
  const type = new URLSearchParams(window.location.search).get("type") || "daily";
  loadChart(type);
});
