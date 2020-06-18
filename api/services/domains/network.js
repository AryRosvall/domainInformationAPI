const express = require('express');
const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

const Router = () => {

  router.get('/', listDomains);
  router.get('/:domain', getDomain);

  function listDomains(req, res, next) {
    Controller.listDomains()
      .then((domain) => {
        response.success(req, res, domain, 200);
      })
      .catch(next);
  }

  function getDomain(req, res, next) {
    const { domain } = req.params;
    Controller.getDomain(domain)
      .then((domain) => {
        response.success(req, res, domain, 200);
      })
      .catch(next);
  }

  return router;
};

module.exports = Router;

