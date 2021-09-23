import jwt from "jsonwebtoken";

export function verifyToken(token) {
  if (token) {
    try {
      const decodedData = jwt.verify(token, process.env.ENCRYPTION_SECRET);
      return decodedData;
    } catch (error) {
      throw new Error(decodedData);
    }
  } else return undefined;
}

export function createJWT(user, time_now) {
  const payload = {
    data: {
      roles: user.roles,
      email: user.email,
      uid: user.id,
      permissions: user.permissions,
    },
    sub: user.id,
    aud: user.id,
    iat: Number(new Date(time_now)),
  };
  return jwt.sign(payload, process.env.ENCRYPTION_SECRET, { expiresIn: "8h" });
}
