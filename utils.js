// utils.js - placeholder helper functions
// IMPORTANT: These are placeholders. Replace sendToSheet with your real Apps Script calls.
function sendToSheet(action, payload) {
  console.log('sendToSheet called:', action, payload);
  // Example: return fetch(YOUR_APPS_SCRIPT_URL + '?action=' + action, { method:'POST', body: JSON.stringify(payload) })
  return Promise.resolve({ success: true, data: null });
}

// Simple local storage wrapper for autosave/resume
const StorageKeyPrefix = 'govtexam_';
function saveLocalAttempt(userEmail, examId, attemptData) {
  if(!userEmail) return;
  const key = StorageKeyPrefix + 'attempt_' + userEmail + '_' + examId;
  localStorage.setItem(key, JSON.stringify(attemptData));
}
function loadLocalAttempt(userEmail, examId) {
  const key = StorageKeyPrefix + 'attempt_' + userEmail + '_' + examId;
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}
function clearLocalAttempt(userEmail, examId) {
  const key = StorageKeyPrefix + 'attempt_' + userEmail + '_' + examId;
  localStorage.removeItem(key);
}
