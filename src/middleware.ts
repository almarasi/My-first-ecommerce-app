import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
  });

  const { pathname } = request.nextUrl;

  if (pathname === "/resetpassword") {
    const resetVerified = request.cookies.get("reset-verified")?.value;
    if (resetVerified !== "true") {
      return NextResponse.redirect(new URL("/forgetpassword", request.url));
    }
  }

  
  if (pathname === "/resetcode") {
    const resetStarted = request.cookies.get("reset-started")?.value;
    if (resetStarted !== "true") {
      return NextResponse.redirect(new URL("/forgetpassword", request.url));
    }
  }

  // Allow payment success and cancel pages without authentication
  if (pathname === "/payment-success" || pathname === "/payment-cancel") {
    return NextResponse.next();
  }

  if (token) {
    if (pathname === "/login" || pathname === "/register" || pathname === "/forgetpassword") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  } else {
    const isProtected =
      pathname === "/cart" ||
      pathname === "/allorders" ||
      pathname.startsWith("/checkout/") ||
      pathname === "/wishlist";

    if (isProtected) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/cart",
    "/login",
    "/register",
    "/checkout/:id*",
    "/allorders",
    "/wishlist",
    "/resetpassword",
    "/resetcode",
    "/forgetpassword",
    "/payment-success",
    "/payment-cancel"
  ],
};
