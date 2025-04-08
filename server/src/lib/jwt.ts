import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secret-key";

export default {
  sign: (payload: object) =>
    jwt.sign(payload, SECRET, { expiresIn: "12h", algorithm: "HS256" }),
  verify: (token: string) => jwt.verify(token, SECRET),
  decode: (token: string) => jwt.decode(token),
};
