import { rolePermissions } from "@/configs/roleConfigs";
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

export function createJWT(user, time_now) {
  const payload = {
    sub: user.id,
    aud: user.id,
    email: user.email,
    iat: Number(new Date(time_now)),
    role: user.role,
    permissions: user.permissions,
  };
  return jwt.sign(payload, process.env.ENCRYPTION_SECRET);
}
