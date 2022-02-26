import { postUrl } from "tinyurl-api-utils";

export const submit = async (longUrl) => {
  try {
    const res = await postUrl(longUrl);
    return res.body.message;
  } catch (error) {
    throw { message: error.response.body.message };
  }
};
