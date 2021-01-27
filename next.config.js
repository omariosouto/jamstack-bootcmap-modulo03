const redirects = require('./config/redirects');
const headers = require('./config/headers');

module.exports = {
  trailingSlash: true,
  async redirects() {
    return redirects;
  },
  async headers() {
    return headers;
  },
};
