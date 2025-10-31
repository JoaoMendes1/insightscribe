import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;

  console.log("\n--- MIDDLEWARE ACIONADO ---");
  console.log("1. Rota sendo acessada:", nextUrl.pathname);

  const secretExists = !!process.env.NEXTAUTH_SECRET;
  console.log("2. NEXTAUTH_SECRET existe?", secretExists);
  if (!secretExists) {
    console.error("ERRO GRAVE: NEXTAUTH_SECRET não encontrado no .env!");
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isLoggedIn = !!token;
  console.log("3. Usuário está logado?", isLoggedIn);

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isPublicRoute = ["/", "/sign-in", "/sign-up"].includes(nextUrl.pathname);
  const isProtectedRoute = nextUrl.pathname.startsWith("/dashboard");

  if (isApiAuthRoute) return NextResponse.next();

  if (isProtectedRoute && !isLoggedIn) {
    console.log("4. Decisão: Rota protegida, usuário deslogado. Redirecionando para /sign-in");
    return NextResponse.redirect(new URL("/sign-in", nextUrl));
  }

  if (isPublicRoute && isLoggedIn) {
    console.log("4. Decisão: Rota pública, usuário logado. Redirecionando para /dashboard");
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  console.log("4. Decisão: Nenhuma regra aplicada. Deixando a requisição passar.");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};