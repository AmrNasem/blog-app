import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./lib/session";

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};

export async function middleware(req: NextRequest) {
  const session = await verifySession();

  let isAuthPage;
  switch (req.nextUrl.pathname) {
    case "/login":
    case "/signup":
      isAuthPage = true;
  }
  // Auth && session => /
  // Auth && !session => Nothing
  // !Auth && session => Nothing
  // !Auth && !session => /login

  if ((isAuthPage && session.userId) || !(isAuthPage || session.userId))
    return NextResponse.redirect(new URL(session.redirectTo, req.url));

  return NextResponse.next();
}
