const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const { apiVersion } = require('config/variables').server;

const baseName = path.basename(__filename);

const registerRouters = app => {

  const router = new Router({
    prefix: `/api/${apiVersion}`,
  });

  // Require all the folders and create a sub-router for each feature api
  fs.readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== baseName)
    .forEach(file => {

      const api = require(path.join(__dirname, file))(Router);

      router.use(api.routes());

    });

  app.use(router.routes()).use(router.allowedMethods());

  return app;

};

module.exports = registerRouters;
