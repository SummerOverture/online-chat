const WebSocket = require('ws');
const { parseCookie } = require('./utils/utils');

const PORT = process.env.PORT;

module.exports = (server) => {
  const wss = new WebSocket.Server({ server });
  const userList = new Map();

  const broadCast = (type, data) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type,
          data,
        }));
      }
    });
  };

  wss.on('connection', (ws, req) => {
    let userInfo = {};

    try {
      userInfo = JSON.parse(decodeURIComponent(parseCookie(req.headers.cookie)['online-chat-sessionId']));
    } catch (e) {
      userInfo = {};
    }

    ws.userInfo = userInfo;

    // 插入新的用户
    userList.set(userInfo.id, userInfo);
    ws.on('message', (message) => {
      broadCast('message', { ...userInfo, message });
    });

    ws.on('close', () => {
      // 移除用户
      userList.delete(userInfo.id);
      broadCast('userLeft', { userInfo, userList: [...userList.values()] });
    });

    broadCast('userIn', { userInfo, userList: [...userList.values()] });
  });

  server.listen(PORT, () => {
    console.log('Listening on %d', server.address().port);
  });
};
