
import { jwtVerify } from 'jose';
import { SignJWT } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;
const encoder = new TextEncoder();

export async function verifyToken(token) {
  if (!token) throw new Error('No token provided');

  const secret = encoder.encode(JWT_SECRET);
  const { payload } = await jwtVerify(token, secret);
  return payload;
}

export async function signToken(payload) {
  const secret = encoder.encode(JWT_SECRET);

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(secret);

  return jwt; 
}