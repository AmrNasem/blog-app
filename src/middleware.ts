import { NextRequest, NextResponse } from "next/server";
import { createSession, verifySession } from "./lib/session";

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};

export async function middleware(req: NextRequest) {
  const session = await verifySession();

  if (session.userId) await createSession(session.userId as string);
  // Auth && session => /
  // Auth && !session => Nothing
  // !Auth && session => Nothing
  // !Auth && !session => /login

  let isAuthPage;
  switch (req.nextUrl.pathname) {
    case "/login":
    case "/signup":
      isAuthPage = true;
  }

  if ((isAuthPage && session.userId) || !(isAuthPage || session.userId))
    return NextResponse.redirect(new URL(session.redirectTo, req.url));

  return NextResponse.next();
}
