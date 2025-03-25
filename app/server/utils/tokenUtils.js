import jwt from "jsonwebtoken";
import crypto from "crypto";

function generateToken(userId, purpose) {
  return jwt.sign(
    {
      sub: userId,
      purpose: purpose,
      jti: crypto.randomBytes(16).toString("hex"),
      iat: Math.floor(Date.now() / 1000),
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
}

export default generateToken;