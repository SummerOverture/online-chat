module.exports = (req, res, next) => {
  const sessionId = req.cookies['online-chat-sessionId'];
  // 没有sessionId
  if (!sessionId) {
    return res.status(403).send('');
  }

  res.locals.USERINFO = sessionId;
  return next();
};
