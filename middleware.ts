// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, type NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.

  function middleware(request: NextRequestWithAuth) {
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      if (request.nextauth.token?.role === "WARGA") {
        return NextResponse.redirect(new URL("/warga", request.url));
      }

      if (
        request.nextauth.token?.role === "PERBEKEL" ||
        request.nextauth.token?.role === "ADMIN"
      ) {
        return NextResponse.redirect(new URL("/staff", request.url));
      }
    }

    if (request.nextUrl.pathname.startsWith("/staff")) {
      if (request.nextauth.token?.role === "WARGA") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      if (request.nextUrl.pathname.startsWith("/staff/warga")) {
        if (request.nextauth.token?.role === "PERBEKEL") {
          return NextResponse.redirect(new URL("/staff", request.url));
        }
      }
    }
    if (
      request.nextUrl.pathname.startsWith("/warga") &&
      request.nextauth.token?.role !== "WARGA"
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
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
  matcher: ["/staff", "/staff/:path*", "/warga", "/warga/:path*", "/dashboard"],
};
