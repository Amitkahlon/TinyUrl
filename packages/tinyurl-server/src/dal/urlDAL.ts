import base62Encoder from "../services/base62Encoder";

const urlDb: Array<string> = [];

/**
 * insert a new url and returns the short url id.
 * @param longUrl
 * @returns
 */
const insert = (longUrl: string) => {
  //check if exists, if not it returns -1
  let index = urlDb.findIndex((item) => item === longUrl);

  if (index === -1) {
    const arrLength = urlDb.push(longUrl);
    index = arrLength - 1;
  }

  const base62index = base62Encoder.encode(index);

  return base62index;
};

const get = (base62Id: string) => {
  const isValidId = base62Encoder.isValidChars(base62Id);

  if(!isValidId){
    throw {message: "url does not exists"}
  }

  const index = base62Encoder.decode(base62Id);

  if (urlDb.length < index) {
    throw {message: "url does not exists"}
  }

  const item = urlDb[index];

  return item;
};

export { get, insert };
