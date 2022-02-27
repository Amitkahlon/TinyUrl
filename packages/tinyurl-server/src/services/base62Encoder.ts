const encodeBase62 = (integer: number) => {
  if (integer < 0) {
    throw new Error("number cannot be negative");
  }
  if (integer === 0) {
    return "0";
  }
  let s: any = [];
  while (integer > 0) {
    s = [base62Encoder.charset[integer % 62], ...s];
    integer = Math.floor(integer / 62);
  }
  return s.join("");
};

const decodeBase62 = (chars: string) => {
  if (!isValidChars(chars)) {
    throw new Error("not a valid chars");
  }
  return chars
    .split("")
    .reverse()
    .reduce(
      (prev, curr, i) => prev + base62Encoder.charset.indexOf(curr) * 62 ** i,
      0
    );
};

const isValidChars = (id: any) => {
  for (let i = 0; i < id.length; i++) {
    const c = id[i];
    const isExists = base62Encoder.charset.includes(c);
    if (!isExists) {
      return false;
    }
  }
  return true;
};

const base62Encoder = {
  charset:
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  decode: decodeBase62,
  encode: encodeBase62,
  isValidChars,
};

export default base62Encoder;
