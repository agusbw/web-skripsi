// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, type NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    if (request.nextUrl.pathname.startsWith("/staff")) {
      if (request.nextauth.token?.role === "WARGA") {
        return NextResponse.rewrite(new URL("/denied", request.url));
      }
      if (request.nextUrl.pathname.startsWith("/staff/warga")) {
        if (request.nextauth.token?.role === "PERBEKEL") {
          return NextResponse.rewrite(new URL("/denied", request.url));
        }
      }
    }
    if (
      request.nextUrl.pathname.startsWith("/warga") &&
      request.nextauth.token?.role !== "WARGA"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/staff", "/staff/:path*", "/warga", "/warga/:path*"],
};
