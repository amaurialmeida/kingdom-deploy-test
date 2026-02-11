import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/login"];

export default async function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;
  const isPublicRoute = publicRoutes.includes(pathname);

  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (token) {
    const isValid = await validateToken(token);

    if (!isValid) {
      if (isPublicRoute) {
        const response = NextResponse.next();
        response.cookies.delete("auth_token");
        return response;
      }
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("NextResponse.next()");
      return response;
    }

    if (isPublicRoute && isValid) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

async function validateToken(token: string): Promise<boolean> {
  if (!token) return false;

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.ok;
  } catch (error) {
    console.error("Erro no Proxy:", error);
    return false;
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$|.*\\.pdf$|favicon.ico).*)",
  ],
};
