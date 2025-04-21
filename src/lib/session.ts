import "server-only";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { redirect } from "next/navigation";

const key = new TextEncoder().encode(process.env.JWT_SECRET);
const redirectTo = "/";

const cookie = {
  name: "session",
  options: {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  } as ResponseCookie,
  duration: 24 * 60 * 60 * 1000,
};

export async function encrypt(payload: { userId: string; expires: Date }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(key);
}

export async function decrypt(storedCookie: string) {
  try {
    const { payload } = await jwtVerify(storedCookie, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
}

export async function createSession(userId: string) {
  const expires = new Date(Date.now() + cookie.duration);
  const session = await encrypt({ userId, expires });
  (await cookies()).set(cookie.name, session, { ...cookie.options, expires });
  return { session };
}

export async function verifySession() {
  const storedCookie = (await cookies()).get(cookie.name)?.value;
  if (!storedCookie) return { redirectTo: "/login" };
  const session = await decrypt(storedCookie);

  if (!session?.userId) return { redirectTo: "/login" };

  await createSession(session.userId as string);

  return { userId: session.userId, redirectTo };
}

export async function deleteSession() {
  (await cookies()).delete(cookie.name);
  redirect("/login");
}
