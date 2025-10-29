import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma"; // Nosso cliente Prisma
import bcrypt from 'bcryptjs';    // Para comparar senhas

export const authOptions: NextAuthOptions = {
  // 1. Configurar os "Provedores" de Autenticação
  providers: [
    CredentialsProvider({
      // O nome que aparecerá na página de login (opcional)
      name: "Credentials",
      // Define os campos que o formulário de login deve ter
      credentials: {
        email: { label: "Email", type: "email", placeholder: "seu.email@exemplo.com" },
        password: { label: "Password", type: "password" }
      },
      // A função 'authorize' é onde a MÁGICA acontece.
      // Ela recebe as credenciais (email/senha) e deve retornar
      // os dados do utilizador se o login for válido, ou null/false se for inválido.
      async authorize(credentials, req) {
        // Verifica se email e senha foram fornecidos
        if (!credentials?.email || !credentials?.password) {
          console.error("Authorize: Email ou senha em falta");
          return null;
        }

        try {
          // Busca o utilizador no banco pelo email
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          // Se não encontrou utilizador ou a senha não bate...
          if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
            console.warn(`Authorize: Falha no login para ${credentials.email}`);
            // Retorna null para indicar falha na autenticação
            return null;
          }

          // Se chegou aqui, o login é VÁLIDO!
          console.log(`Authorize: Login bem-sucedido para ${user.email}`);
          // Retorna o objeto do utilizador (APENAS dados seguros!)
          // O Auth.js usará isso para criar a sessão.
          return {
            id: user.id,
            email: user.email,
            // NÃO inclua a senha aqui!
          };
        } catch (error) {
          console.error("Authorize: Erro ao buscar/comparar utilizador:", error);
          return null; // Retorna null em caso de erro inesperado
        }
      }
    })
    // Mais tarde, adicionaremos GoogleProvider(...) aqui
  ],

  // 2. Configurar a Estratégia de Sessão (JWT é mais simples para começar)
  session: {
    strategy: "jwt", // Usaremos JSON Web Tokens para gerir a sessão
  },

  // 3. Chave Secreta (MUITO IMPORTANTE para segurança do JWT)
  // O Auth.js usará esta chave para assinar os tokens JWT.
  // Vamos buscar esta chave das variáveis de ambiente.
  secret: process.env.NEXTAUTH_SECRET,

  // 4. Configurar Callbacks (Opcional, mas útil)
  // Permite customizar o que acontece durante o fluxo de autenticação
  callbacks: {
    // O callback 'jwt' é chamado sempre que um JWT é criado ou atualizado.
    // Usamo-lo para adicionar informações ao token (como o ID do utilizador).
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Adiciona o ID do utilizador ao token
      }
      return token;
    },
    // O callback 'session' é chamado sempre que a sessão é verificada.
    // Usamo-lo para adicionar informações do token à sessão que o frontend recebe.
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string; // Adiciona o ID do utilizador à sessão
      }
      return session;
    },
  },

  // 5. Configurar Páginas (Opcional)
  // Diz ao Auth.js qual é a nossa página de login customizada.
  pages: {
    signIn: '/sign-in',
    // signOut: '/auth/signout', // Podemos adicionar depois
    // error: '/auth/error', // Página para mostrar erros de autenticação
    // verifyRequest: '/auth/verify-request', // Página para email de verificação
    // newUser: null // Página para novos utilizadores (ex: escolher username)
  }
};