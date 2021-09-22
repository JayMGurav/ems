import jwt from "jsonwebtoken";

export function verifyToken(token) {
  if (token) {
    const decodedData = jwt.verify(
      token,
      process.env.ENCRYPTION_SECRET,
      function (err, decodedToken) {
        if (err) throw new Error("Error decoding JWT" + err.message);
        return decodedToken;
        s;
      }
    );
    return decodedData;
  } else return undefined;
}

export function createJWTFromPayload(payload) {
  return jwt.sign(payload, process.env.ENCRYPTION_SECRET, {
    // expiresIn: "7d",
  });
}
