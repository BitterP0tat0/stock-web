function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

async function fetchHoldings(username) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/api/accounts/${encodeURIComponent(username)}/holdings`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch holdings');
    }

    const holdings = await response.json();
    return holdings;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// async function renderBalance() {
//   const username = getQueryParam('username');
//   console.log('Logged in username:', username);

//   const holdings = await fetchHoldings(username);

//   const amount = document.getElementById('amount'); 

//   if (holdings.length === 0) {
//     amount.innerHTML = '<p class="text-muted">0 $</p>';
//   } else {
//     const totalBalance = holdings.reduce(
//       (sum, holding) => sum + (holding.current_price || 0) * (holding.quantity || 0),
//       0
//     );
//     amount.innerHTML = `<p class="text-muted">Total Balance: $${totalBalance.toFixed(2)}</p>`;
//   }
// }

// renderBalance();
