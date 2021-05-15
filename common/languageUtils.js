function validLanguage(language) {
     if (!language) {
          return false;
     }
     return ['en', 'de'].includes(language);
}

module.exports = { validLanguage };
