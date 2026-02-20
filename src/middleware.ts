import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const userAuthToken = req.cookies.get("adminAuth")?.value;

  const { pathname } = req.nextUrl;

  const SignInPage = pathname === "/admin/auth";
  const SignUpPage = pathname === "/admin/sign-up";
  const AdminDashboard = pathname === "/dashboard"


  // If user is logged in, prevent access to auth pages
  if (userAuthToken && (SignInPage || SignUpPage)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!userAuthToken && AdminDashboard) {
    return NextResponse.redirect(new URL("/admin/auth", req.url));
  }


  // Allow the request if no condition matched
  return NextResponse.next();
}
