import { createServerClient } from "@supabase/ssr";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const authRoutes = ["/login", "/sign-up", "/forgot-password"];
  const cookiesStore = await cookies();
  const isRecoveryMode = cookiesStore.get("recoveryMode")?.value === "true";
  const pathname = request.nextUrl.pathname;

  if (pathname === "/set-new-password" && (!user || !isRecoveryMode)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user && isRecoveryMode) {
    if (pathname === "/verify-otp") {
      return NextResponse.redirect(new URL("/set-new-password", request.url));
    }

    if (pathname !== "/set-new-password") {
      return NextResponse.redirect(new URL("/set-new-password", request.url));
    }
    return supabaseResponse;
  }

  if (user && pathname === "/dashboard") {
    if (user.user_metadata.role !== "admin") {
      console.log("this is the role", user.user_metadata.role);
      return NextResponse.redirect(new URL("/", request.url));
    }
    return supabaseResponse;
  }

  if (user && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!user && (pathname === "/order" || pathname === "/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return supabaseResponse;
}
