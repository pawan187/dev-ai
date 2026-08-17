import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  "/sign-in",
  "/sign-up",
  "/",
];

const isPublicRoute = (pathname: string) => {
  return publicRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"));
};

export const proxy = clerkMiddleware(async (auth, request: NextRequest) => {
  const { userId } = await auth();
  const pathname = request.nextUrl.pathname;

  // Allow public routes without authentication
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to sign-in
  if (!userId) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("redirect_url", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
