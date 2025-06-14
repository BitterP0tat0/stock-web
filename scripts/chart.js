    // APJKM04Q8Q5VU2W7 another API key for Alpha Vantage
    // 7iuvkjj3japk0g2g is the API key used in this 
    const apiKey = 'APJKM04Q8Q5VU2W7';
    const h1 = document.querySelector('h1');
    const symbol = new URLSearchParams(window.location.search).get('symbol');
    const ctx = document.getElementById('closePriceChart').getContext('2d');
    let chartInstance = null;

    if (!symbol) {
      alert('No stock symbol provided.');
      throw new Error('No stock symbol provided.');
    }

    h1.textContent = `Stock Chart for ${symbol.toUpperCase()}`;

    function formatDate(dateStr, type) {
      const [year, month, day] = dateStr.split('-');
      if (type === 'daily') return `${month}/${day}/${year}`;
      if (type === 'monthly') return `${month}/${year}`;
      return year;
    }

    function loadChart(type) {
      let functionType = 'TIME_SERIES_DAILY';
      if (type === 'monthly') functionType = 'TIME_SERIES_MONTHLY';

      const url = `https://www.alphavantage.co/query?function=${functionType}&symbol=${symbol}&apikey=${apiKey}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          let timeSeries;
          if (type === 'daily') timeSeries = data['Time Series (Daily)'];
          else if (type === 'monthly') timeSeries = data['Monthly Time Series'];

          if (!timeSeries) {
            alert('API error or limit reached.');
            return;
          }

          let rawDates = Object.keys(timeSeries);

          if (type === 'yearly') {
            rawDates = rawDates.filter(d => d.includes('-01-')).slice(0, 10); 
          } else {
            rawDates = rawDates.slice(0, 10);
          }

          rawDates = rawDates.reverse(); 

          const labels = rawDates.map(date => formatDate(date, type));
          const closePrices = rawDates.map(date => parseFloat(timeSeries[date]['4. close']));
          const openPrices = rawDates.map(date => parseFloat(timeSeries[date]['1. open']));

          if (chartInstance) {
            chartInstance.destroy();
          }

          chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'Close Price (USD)',
                  data: closePrices,
                  borderColor: '#3b82f6',
                  backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  fill: true,
                  tension: 0.4,
                  pointRadius: 4,
                  pointHoverRadius: 6,
                },
                {
                  label: 'Open Price (USD)',
                  data: openPrices,
                  borderColor: '#f87171',
                  backgroundColor: 'rgba(248, 113, 113, 0.2)',
                  fill: true,
                  tension: 0.4,
                  pointRadius: 4,
                  pointHoverRadius: 6,
                }
              ]
            },
            options: {
              responsive: true,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: type === 'daily' ? 'Date (MM/DD/YYYY)' : type === 'monthly' ? 'Month/Year' : 'Year'
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: 'Price in USD'
                  },
                  beginAtZero: false
                }
              },
              plugins: {
                legend: {
                  display: true,
                  position: 'top'
                },
                tooltip: {
                  mode: 'index',
                  intersect: false
                }
              },
              interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
              }
            }
          });
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Failed to fetch data.');
        });
    }

    loadChart('daily');