import NextAuth from "next-auth"
import { authOptions } from "@/lib/authOptions" 

const handler = NextAuth(authOptions) 

// Exporta como GET e POST
export { handler as GET, handler as POST }