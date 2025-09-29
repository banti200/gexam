// admin.js - placeholder admin dashboard functionality
document.addEventListener('DOMContentLoaded', ()=>{
  const adminLogin = document.getElementById('adminLogin');
  const adminPass = document.getElementById('adminPass');
  const adminMsg = document.getElementById('adminMsg');
  const dash = document.getElementById('dash');
  const loginWrap = document.getElementById('loginWrap');
  const resultsTableBody = document.querySelector('#resultsTable tbody');
  const refreshBtn = document.getElementById('refreshBtn');
  const downloadBtn = document.getElementById('downloadBtn');

  const ADMIN_PASSWORD = 'admin123';

  adminLogin.addEventListener('click', ()=>{
    if(adminPass.value === ADMIN_PASSWORD) {
      loginWrap.style.display = 'none';
      dash.style.display = 'block';
      loadResults();
    } else {
      adminMsg.textContent = 'Incorrect password.';
    }
  });

  refreshBtn.addEventListener('click', loadResults);
  downloadBtn.addEventListener('click', downloadCSV);

  async function loadResults() {
    resultsTableBody.innerHTML = '<tr><td colspan="6">Loading...</td></tr>';
    const res = await sendToSheet('getResults', {}); // placeholder
    // For now, simulate sample data if no real data returned
    const rows = (res && res.data) ? res.data : [
      { name:'Test Student', email:'test@example.com', subject:'General Knowledge', score:'85', date:'2025-09-28' }
    ];
    resultsTableBody.innerHTML = '';
    rows.forEach((r,i)=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${i+1}</td><td>${r.name}</td><td>${r.email}</td><td>${r.subject}</td><td>${r.score}</td><td>${r.date}</td>`;
      resultsTableBody.appendChild(tr);
    });
  }

  function downloadCSV() {
    // build CSV from table
    let csv = [];
    const rows = document.querySelectorAll('#resultsTable tr');
    rows.forEach(row => {
      const cols = row.querySelectorAll('th,td');
      const rowArr = [];
      cols.forEach(col => rowArr.push('"' + (col.innerText || '').replace(/"/g,'""') + '"'));
      csv.push(rowArr.join(','));
    });
    const csvStr = csv.join('\n');
    const blob = new Blob([csvStr], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'results.csv'; document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  }
});
