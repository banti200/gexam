// profile.js - handles profile save/load using sendToSheet placeholder
document.addEventListener('DOMContentLoaded', ()=> {
  const form = document.getElementById('profileForm');
  const status = document.getElementById('statusMsg');
  // Try to prefill if session has user (simple example using localStorage)
  const user = JSON.parse(localStorage.getItem('govt_user') || 'null');
  if(user) {
    document.getElementById('name').value = user.name || '';
    document.getElementById('qualification').value = user.qualification || '';
    document.getElementById('email').value = user.email || '';
  }
  form.addEventListener('submit', async (e)=> {
    e.preventDefault();
    const data = {
      name: document.getElementById('name').value.trim(),
      qualification: document.getElementById('qualification').value.trim(),
      email: document.getElementById('email').value.trim()
    };
    // Update local session copy
    localStorage.setItem('govt_user', JSON.stringify(data));
    // Send to sheet (placeholder)
    const res = await sendToSheet('updateProfile', data);
    if(res && res.success) {
      status.textContent = 'Profile saved successfully.';
      setTimeout(()=> status.textContent = '', 3000);
    } else {
      status.style.color = 'red';
      status.textContent = 'Failed to save profile (placeholder).';
    }
  });
});
