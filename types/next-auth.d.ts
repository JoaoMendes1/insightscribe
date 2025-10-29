import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

// Estende o tipo JWT padrão para incluir o 'id'
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
  }
}

// Estende os tipos User e Session padrão para incluir o 'id'
declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
  }

  interface Session {
    user: User & DefaultSession["user"]; // Garante que name, email, image ainda existem
  }
}