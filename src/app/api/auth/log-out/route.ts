// app/api/auth/logout/route.ts
import {  NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("🔓 Logout request received");

    // Create response
    const res = NextResponse.json(
      {
        message: "Logout successful",
        success: true,
      },
      { status: 200 }
    );

    // Clear the adminAuth cookie by setting it to expired
    res.cookies.set("adminAuth", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0, // Immediately expire the cookie
      path: "/",
      expires: new Date(0), // Set expiration to past date
    });

    console.log("✅ Logout successful, cookie cleared");
    return res;

  } catch (error) {
    console.error("❌ Logout API error:", error);
    return NextResponse.json(
      { 
        message: "Internal Server Error",
        success: false 
      },
      { status: 500 }
    );
  }
}


