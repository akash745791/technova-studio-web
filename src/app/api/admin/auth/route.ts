import { NextRequest, NextResponse } from "next/server";
import { adminLoginSchema } from "@/lib/validations";
import { validateCredentials, createAdminToken, COOKIE_NAME, isAuthenticatedAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = adminLoginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid login format" },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    if (!validateCredentials(email, password)) {
      return NextResponse.json(
        { success: false, error: "Invalid admin email or password" },
        { status: 401 }
      );
    }

    const token = createAdminToken(email);

    const response = NextResponse.json({
      success: true,
      message: "Admin authentication successful",
      user: { email, role: "admin" },
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err) {
    console.error("Login route error:", err);
    return NextResponse.json(
      { success: false, error: "Internal authentication error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, role: "admin" });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out" });
  response.cookies.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
  return response;
}
