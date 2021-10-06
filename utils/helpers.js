 
module.exports = {
  format_date: function format_date(date) {
    return "".concat (new Date(date) .getMonth() + 1, "/") 
    .concat(new Date(date) .getDate(), "/")
    .concat(new Date(date) .getFullYear());
  },

  format_url: function format_url(url) {
    return url.replace ('http://', '') .replace('https://', '')
    .replace('www.', '').split('/')[0].split('?')[0];
  },

  format_plural: function format_plural (word, amount) {
    if (amount !== 1) {
      return "".concat(word, "s");
    }

    return word;
    }
  };
  