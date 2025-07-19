let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateBalance() {
  const balance = transactions.reduce((acc, t) => {
    return t.type === 'income' ? acc + t.amount : acc - t.amount;
  }, 0);
  document.getElementById('balance').textContent = balance.toFixed(2);
}

function renderTransactions(list = transactions) {
  const listEl = document.getElementById('transaction-list');
  listEl.innerHTML = '';

  list.forEach((t, index) => {
    const li = document.createElement('li');
    li.className = t.type;
    li.textContent = `${t.date} - ${t.description}: $${t.amount.toFixed(2)}`;
    listEl.appendChild(li);
  });
}

function addTransaction(e) {
  e.preventDefault();
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;
  const date = document.getElementById('date').value;

  if (!description || !amount || !date) return;

  const transaction = { description, amount, type, date };
  transactions.push(transaction);
  localStorage.setItem('transactions', JSON.stringify(transactions));

  document.getElementById('transaction-form').reset();
  updateBalance();
  renderTransactions();
}

function applyFilters() {
  const date = document.getElementById('filter-date').value;
  const type = document.getElementById('filter-type').value;

  let filtered = [...transactions];

  if (date) {
    filtered = filtered.filter(t => t.date === date);
  }

  if (type !== 'all') {
    filtered = filtered.filter(t => t.type === type);
  }

  renderTransactions(filtered);
}

document.getElementById('transaction-form').addEventListener('submit', addTransaction);

updateBalance();
renderTransactions();
