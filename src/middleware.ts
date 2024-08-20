import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const token = await getToken({ req: request });

  if (token && ["/sign-in","/sign-up"].includes(url.pathname)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  if (!token && url.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up"],
};
