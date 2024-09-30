import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const key = new TextEncoder().encode(process.env.JWT_SECRET);

export function encrypt(payload: { username: string; expires: Date }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(key);
}

async function decrypt(token: string) {
  const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
  return payload;
}

export async function verifySession(token: string) {
  if (!token) return null;
  return await decrypt(token);
}

export async function getSession() {
  const token = cookies().get("session")?.value;
  if (!token) return null;
  return await decrypt(token);
}
