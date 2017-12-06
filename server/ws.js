const WebSocket = require('ws');
const url = require('url');

const PORT = process.env.PORT;
module.exports = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws, req) => {
    const location = url.parse(req.url, true);
    // You might use location.query.access_token to authenticate or share sessions
    // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
    console.log(location);

    ws.on('message', (message) => {
      console.log('received: %s', message);
    });

    ws.send('something');
  });

  server.listen(PORT, () => {
    console.log('Listening on %d', server.address().port);
  });
};
