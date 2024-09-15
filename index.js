document.addEventListener('DOMContentLoaded', () => {
    fetch('https://quab-backend.onrender.com/api/top-ten')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#crypto-table tbody');
            
            data.forEach((crypto, index) => {
                const row = tableBody.insertRow();
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${crypto.name}</td>
                    <td>₹ ${Number(crypto.last).toLocaleString('en-IN')}</td>
                    <td>₹ ${Number(crypto.buy).toLocaleString('en-IN')} / ₹ ${Number(crypto.sell).toLocaleString('en-IN')}</td>
                    <td>${calculateDifference(crypto.buy, crypto.last)}%</td>
                    <td>${calculateSavings(crypto.buy, crypto.last)}</td>
                `;
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

function calculateDifference(buy, last) {
    return ((buy - last) / last * 100).toFixed(2);
}

function calculateSavings(buy, last) {
    const savings = (buy - last).toFixed(2);
    return savings > 0 ? `▲ ₹ ${Math.abs(savings).toLocaleString('en-IN')}` : `▼ ₹ ${Math.abs(savings).toLocaleString('en-IN')}`;
}
