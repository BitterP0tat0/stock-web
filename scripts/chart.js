// APJKM04Q8Q5VU2W7 another API key for Alpha Vantage
// 7iuvkjj3japk0g2g is the API key used in this
//JC7BX25B57MR7G7U

// const apiKey = "JC7BX25B57MR7G7U";
// const symbol =
//   new URLSearchParams(window.location.search).get("symbol") || "MSFT";
// let chartInstance = null;
// let cachedData = { labels: [], closePrices: [], openPrices: [] };
// let ctx = null;

// function formatDate(dateStr, type) {
//   const [year, month, day] = dateStr.split("-");
//   if (type === "daily") return `${month}/${day}/${year}`;
//   if (type === "monthly") return `${month}/${year}`;
//   return year;
// }

// function getChartColors() {
//   const style = getComputedStyle(document.body);
//   return {
//     textColor: style.getPropertyValue("--text-color").trim(),
//     bgColor: style.getPropertyValue("--chart-bg-color").trim(),
//   };
// }

// function renderChart() {
//   const canvas = document.getElementById("closePriceChart");
//   if (!canvas) {
//     console.error("Canvas element not found");
//     return;
//   }

//   if (!ctx) {
//     ctx = canvas.getContext("2d");
//   }

//   const { textColor, bgColor } = getChartColors();
//   if (chartInstance) chartInstance.destroy();

//   chartInstance = new Chart(ctx, {
//     type: "line",
//     data: {
//       labels: cachedData.labels,
//       datasets: [
//         {
//           label: "Close Price (USD)",
//           data: cachedData.closePrices,
//           borderColor: "#3b82f6",
//           backgroundColor: "rgba(59, 130, 246, 0.2)",
//           fill: true,
//           tension: 0.4,
//           pointRadius: 4,
//           pointHoverRadius: 6,
//         },
//         {
//           label: "Open Price (USD)",
//           data: cachedData.openPrices,
//           borderColor: "#f87171",
//           backgroundColor: "rgba(248, 113, 113, 0.2)",
//           fill: true,
//           tension: 0.4,
//           pointRadius: 4,
//           pointHoverRadius: 6,
//         },
//       ],
//     },
//     options: {
//       plugins: {
//         legend: {
//           labels: {
//             color: textColor,
//             font: { size: 14 },
//           },
//         },
//       },
//       scales: {
//         x: {
//           title: {
//             display: true,
//             text: "Date (MM/DD/YYYY)",
//             color: textColor,
//           },
//           ticks: { color: textColor },
//           grid: { color: bgColor },
//         },
//         y: {
//           title: {
//             display: true,
//             text: "Price in USD",
//             color: textColor,
//           },
//           ticks: { color: textColor },
//           grid: { color: bgColor },
//           beginAtZero: false,
//         },
//       },
//     },
//   });
// }

// function loadChart(type) {
//   const email = new URLSearchParams(window.location.search).get("email");

//   let functionType = "TIME_SERIES_DAILY";
//   if (type === "monthly") functionType = "TIME_SERIES_MONTHLY";
//   else if (type === "yearly") functionType = "TIME_SERIES_MONTHLY";
//   const username = new URLSearchParams(window.location.search).get("username");
//   const url = `https://www.alphavantage.co/query?function=${functionType}&symbol=${symbol}&apikey=${apiKey}`;

//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       let timeSeries =
//         type === "daily"
//           ? data["Time Series (Daily)"]
//           : data["Monthly Time Series"];

//       if (!timeSeries) {
//         alert("Limit reached or Symbol not correct.");
//         return;
//       }

//       let rawDates = Object.keys(timeSeries);
//       if (type === "yearly")
//         rawDates = rawDates.filter((d) => d.includes("-01-")).slice(0, 10);
//       else rawDates = rawDates.slice(0, 10);
//       rawDates = rawDates.reverse();

//       cachedData.labels = rawDates.map((date) => formatDate(date, type));
//       cachedData.closePrices = rawDates.map((date) =>
//         parseFloat(timeSeries[date]["4. close"])
//       );
//       cachedData.openPrices = rawDates.map((date) =>
//         parseFloat(timeSeries[date]["1. open"])
//       );

//       renderChart();
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       alert("Failed to fetch data.");
//     });
// }

// function handleModeChange() {
//   renderChart();
// }

// const observer = new MutationObserver((mutations) => {
//   mutations.forEach((mutation) => {
//     if (mutation.type === "attributes" && mutation.attributeName === "class") {
//       handleModeChange();
//     }
//   });
// });

// observer.observe(document.body, {
//   attributes: true,
//   attributeFilter: ["class"],
// });

// window.addEventListener("DOMContentLoaded", () => {
//   console.log("DOM Content Loaded");

//   const h1 = document.querySelector("h1");
//   if (h1) {
//     h1.textContent = `Stock Chart for ${symbol.toUpperCase()}`;
//   }

//   const canvas = document.getElementById("closePriceChart");
//   console.log("Canvas element:", canvas);
//   if (canvas) {
//     ctx = canvas.getContext("2d");
//     console.log("Canvas context:", ctx);
//   } else {
//     console.error("Canvas element not found!");
//   }

//   const type =
//     new URLSearchParams(window.location.search).get("type") || "daily";
//   console.log("Loading chart for type:", type);
//   loadChart(type);
// });

const symbol =
  new URLSearchParams(window.location.search).get("symbol") || "AAPL"; // 改为AAPL示例
let chartInstance = null;
let cachedData = { labels: [], closePrices: [], openPrices: [] };
let ctx = null;

function formatDate(dateStr, type) {
  return dateStr;
}

function getChartColors() {
  const style = getComputedStyle(document.body);
  return {
    textColor: style.getPropertyValue("--text-color").trim(),
    bgColor: style.getPropertyValue("--chart-bg-color").trim(),
  };
}

function renderChart() {
  const canvas = document.getElementById("closePriceChart");
  if (!canvas) {
    console.error("Canvas element not found");
    return;
  }

  if (!ctx) {
    ctx = canvas.getContext("2d");
  }

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

// 写死数据，不调用API
const hardcodedData = {
  daily: {
    labels: [
      "07/01/2025",
      "06/30/2025",
      "06/29/2025",
      "06/28/2025",
      "06/27/2025",
      "06/26/2025",
      "06/25/2025",
      "06/24/2025",
      "06/23/2025",
      "06/22/2025",
    ],
    closePrices: [
      178.1, 176.5, 177.3, 175.8, 174.6, 175.2, 174.0, 173.4, 172.8, 171.9,
    ],
    openPrices: [
      177.0, 175.8, 176.9, 175.0, 174.0, 174.5, 173.5, 172.8, 172.0, 171.5,
    ],
  },
  monthly: {
    labels: [
      "01/2025",
      "12/2024",
      "11/2024",
      "10/2024",
      "09/2024",
      "08/2024",
      "07/2024",
      "06/2024",
      "05/2024",
      "04/2024",
    ],
    closePrices: [
      172.8, 170.5, 168.9, 165.0, 162.3, 160.4, 158.9, 157.0, 155.8, 154.0,
    ],
    openPrices: [
      171.5, 169.0, 167.5, 164.2, 161.5, 159.6, 158.0, 156.0, 154.7, 153.1,
    ],
  },
  yearly: {
    labels: [
      "2025",
      "2024",
      "2023",
      "2022",
      "2021",
      "2020",
      "2019",
      "2018",
      "2017",
      "2016",
    ],
    closePrices: [
      170.0, 160.5, 150.0, 140.2, 130.5, 120.3, 110.8, 100.4, 90.1, 85.0,
    ],
    openPrices: [
      168.5, 159.0, 148.5, 138.0, 128.5, 118.0, 108.5, 98.5, 88.0, 82.5,
    ],
  },
};

function loadChart(type) {
  if (!hardcodedData[type]) {
    alert("Invalid chart type");
    return;
  }

  cachedData.labels = hardcodedData[type].labels;
  cachedData.closePrices = hardcodedData[type].closePrices;
  cachedData.openPrices = hardcodedData[type].openPrices;

  renderChart();
}

function handleModeChange() {
  renderChart();
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "attributes" && mutation.attributeName === "class") {
      handleModeChange();
    }
  });
});

observer.observe(document.body, {
  attributes: true,
  attributeFilter: ["class"],
});

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded");

  const h1 = document.querySelector("h1");
  if (h1) {
    h1.textContent = `Stock Chart for ${symbol.toUpperCase()} (Hardcoded Data)`;
  }

  const canvas = document.getElementById("closePriceChart");
  if (canvas) {
    ctx = canvas.getContext("2d");
  } else {
    console.error("Canvas element not found!");
  }

  const type =
    new URLSearchParams(window.location.search).get("type") || "daily";
  console.log("Loading chart for type:", type);
  loadChart(type);
});
