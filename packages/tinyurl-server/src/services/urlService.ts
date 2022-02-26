import { insert, get } from '../dal/urlDAL';

const BASE = 'http://localhost:5000';

/**
 * returns url based on the base url and id
 * @param id
 * @returns
 */
const getShortUrl = (id: string) => {
  const url = `${BASE}/${id}`;
  return url;
};

const addUrl = (longUrl: string) => {
  const { isValid, long, short } = isValidStringLength(longUrl);
  if (!isValid) {
    if (!long) {
      throw { problem: "long", message: 'url is longer than 150 chars' };
    } else {
      throw { problem: "short", message: 'url cannot be empty' };
    }
  }

  const isValidUrl = isValidHttpUrl(longUrl);
  if (isValidUrl) {
    const index = insert(longUrl);
    const url = getShortUrl(index);
    return url;
  } else {
    throw { message: 'not a valid http/https url' };
  }
};

const getLongUrl = (id: string) => {
  const longUrl = get(id);

  return longUrl;
};

const isValidHttpUrl = (string: string) => {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
};

const isValidStringLength = (string: string) => {
  const length = string.length;
  const validObj = {
    short: length !== 0,
    long: length <= 150,
    isValid: length !== 0 && length <= 150,
  };
  return validObj;
};

export { getShortUrl, addUrl, getLongUrl };
