const router = require('express').Router();
const auth = require('../middleware/auth');
const uuidv1 = require('uuid/v1');

module.exports = (app) => {
  app.use('/login', router);
};

router.post('/', (req, res, next) => {
  try {
    res.cookie('online-chat-sessionId', { nickname: req.body.nickname || '未知用户', id: uuidv1() }, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.send('');
  } catch (e) {
    next(e);
  }
});

router.post('/checkAuth', auth, (req, res) => {
  res.JSON(res.locals.USERINFO);
});
