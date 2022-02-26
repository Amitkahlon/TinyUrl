const createRequest = require("./createHttpRequest");
const { baseUrl, postUrlRoute } = require("./appsettings.json");

const getUrl = (id) => {
  const url = baseUrl + "/" + id;
  const req = createRequest(url, "GET");
  return req;
};

const postUrl = (longLink) => {
  const url = baseUrl + postUrlRoute;
  const body = { url: longLink };
  const req = createRequest(url, "POST", body, "json");
  return req;
};

module.exports = {
  getUrl,
  postUrl,
};
