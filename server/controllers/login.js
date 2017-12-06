const router = require('express').Router();
const auth = require('../middleware/auth');
const uuidv1 = require('uuid/v1');
const { parseCookie } = require('../utils/utils');

module.exports = (app) => {
  app.use('/login', router);
};

router.post('/', (req, res, next) => {
  try {
    const session = JSON.parse(decodeURIComponent(parseCookie(req.headers.cookie)['online-chat-sessionId'] || '{}'));
    const userInfo = {
      nickname: req.body.nickname || '未知用户',
      id: session.id || uuidv1(),
      image: session.image || Math.ceil(Math.random() * 5),
    };
    res.cookie('online-chat-sessionId',
      JSON.stringify(userInfo),
      {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    res.send(userInfo);
  } catch (e) {
    next(e);
  }
});

router.post('/checkAuth', auth, (req, res) => {
  res.json(JSON.parse(res.locals.USERINFO));
});
