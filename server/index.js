const glob = require('glob');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.locals.REQUEST_TIME = new Date().pattern('yyyy-MM-dd HH:mm:ss');

    res.on('finish', () => {
      console.info(JSON.stringify({
        code: res.statusCode,
        url: req.originalUrl,
        headers: req.headers || {},
        user: res.locals.USERINFO || {},
      }));
    });

    next();
  });

  glob.sync(`${__dirname}/controllers/**/*.js`)
    .forEach(controller => require(controller)(app));
  // not found
  app.use((req, res) => {
    const requestData = {
      url: req.originalUrl,
      method: req.method,
      alias: res.locals.ALIAS || '',
      param: req.body,
      cookie: req.cookies,
      headers: req.headers,
    };
    console.error(requestData);
    res.status(404).send('Not Found');
  });

  /* eslint-disable no-unused-vars */
  // noinspection JSUnusedLocalSymbols
  app.use((err, req, res, next) => {
    // 先记录错误信息
    const errinfo = {
      processid: process.id,
      url: req.originalUrl,
      msg: err ? err.message : '',
      user: res.locals.USERINFO || {},
      requestTime: res.locals.REQUEST_TIME || '',
      param: req.body,
      headers: req.headers,
      dubbo: err.dubbo || '',
      errstack: err ? err.stack : '',
      bakdata: err.result || {},
    };

    console.error(JSON.stringify(errinfo));
    if (!res.finished) {
      res.status(500).send('操作失败');
    }
  });
};
