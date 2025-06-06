const socket = io('http://localhost:8080/finnhub', {
  transports: ['websocket']
});

socket.on('connect', () => {
  console.log('✅ Connected to server, id:', socket.id);

  socket.emit('subscribe', { symbol: 'AAPL' });
});

socket.on('trades', (trades) => {
  console.log('🟢 Received trades:', trades);

  const tbody = document.getElementById('tradeBody');
  tbody.innerHTML = ''; 

  trades.forEach(trade => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${trade.s}</td>
      <td>${trade.p}</td>
      <td>${trade.v}</td>
      <td>${new Date(trade.t).toLocaleTimeString()}</td>
    `;
    tbody.appendChild(row);
  });
});

socket.on('disconnect', () => {
  console.log('🔴 Disconnected from server');
});
socket.on('error', (error) => {
  console.error('⚠️ WebSocket error:', error);
});