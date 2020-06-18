const domain = require('./services/domains/network');
const config = require('../config');

/**
 * Function that exposes the API routes
 * @param  {} app
 * @param  {} router
 */
module.exports = (app) => {
  app.use(`/api/${config.api.version}/domains`, domain());
};

