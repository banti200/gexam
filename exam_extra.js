// exam_extra.js - adds autosave, resume and basic translation support for exam pages
// Use this file by including <script src="js/exam_extra.js"></script> in exam.html after existing script.js
(function(){
  // simple translation map (example)
  const translations = {
    'Start Exam': { 'mr': 'परीक्षा सुरू करा' },
    'Submit': { 'mr': 'सबमिट करा' },
  };

  function translatePage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if(translations[key] && translations[key][lang]) el.textContent = translations[key][lang];
    });
  }

  // Expose functions globally
  window.examUtils = {
    saveAttempt: function(userEmail, examId, attempt) {
      saveLocalAttempt(userEmail, examId, attempt);
      // also try to send to sheet (placeholder)
      sendToSheet('saveAttempt', { userEmail, examId, attempt });
    },
    loadAttempt: function(userEmail, examId) {
      return loadLocalAttempt(userEmail, examId);
    },
    clearAttempt: function(userEmail, examId) {
      clearLocalAttempt(userEmail, examId);
    },
    translatePage,
  };
})();
