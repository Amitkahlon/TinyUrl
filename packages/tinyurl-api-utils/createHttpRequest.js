const superAgent = require("superagent");

const setRequestMethod = (url, method) => {
  method = method.toUpperCase();
  let req;
  switch (method) {
    case "GET":
      req = superAgent.get(url);
      break;
    case "POST":
      req = superAgent.post(url);
      break;
    case "PUT":
      req = superAgent.put(url);
      break;
    case "DELETE":
      req = superAgent.delete(url);
      break;
  }

  return req;
};

const createRequest = (
  url,
  method,
  body,
  contentType,
  authToken,
  query,
  headers
) => {
  const requestObject = setRequestMethod(url, method);

  if (body !== undefined) {
    requestObject.send(body);
  }

  if (contentType !== undefined) {
    requestObject.type(contentType);
  }

  if (headers !== undefined) {
    requestObject.set(headers);
  }

  if (authToken !== undefined) {
    requestObject.auth(authToken, { type: "bearer" });
  }

  if (query !== undefined) {
    requestObject.query(query);
  }

  return requestObject;
};

module.exports = createRequest;
