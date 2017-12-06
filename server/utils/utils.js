exports.parseCookie = (cookie) => {
  const cookies = {};
  if (!cookie) return cookies;
  const list = cookie.split(';');
  for (let i = 0; i < list.length; i++) {
    const pair = list[i].split('=');
    cookies[pair[0].trim()] = pair[1];
  }
  return cookies;
};

