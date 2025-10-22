import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { request } from "http";

export async function POST(request: NextRequest) {
    try {
        // 1. Ler os dados do corpo da requisição 
        const body = await request.json()
        const { email, password } = body

        // 2. Validar se os dados vieram
        if (!email || !password) {
            return NextResponse.json(
                { message: 'Email e senha são obrigatórios' },
                { status: 400 } // Bad Request
            )
        }

        // 3. Buscar o usuário no banco de dados pelo email 
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        })

        // 4. Verificar se o usuário existe
        if (!user) {
            // Usamos 401 (Unauthorized) para ambos os casos (usuário não encontrado ou senha errada)
            // Por motivo de segurança (Não dar pistas a atacantes)
            return NextResponse.json(
                { message: 'Credenciais inválidas!' },
                { status: 401 } // Unauthorized 
            )
        }

        // 5. Comparar a senha fornecida com a senha criptografada 
        const isPasswordValid = await bcrypt.compare(password, user.password)

        // 6. Verificar se a senha é válida 
        if (!isPasswordValid) { // Condição crucial SE NÃO FOR VÁLIDA (!)
            // Retorna erro se as senhas não baterem
            return NextResponse.json (
                { message: 'Credenciais Inválidas' }, 
                { status: 401 }
            )
        }

        // 7. Se tudo deu certo, retornar sucesso (sem a senha!)
        // POR ENQUANTO: Retornamos apenas o usuário. 
        // NO FUTURO: Aqui é onde o Auth.js vai gerar um token/sessão
        return NextResponse.json(
            {
                message: 'Login bem-sucedido!',
                user: { id: user.id, email: user.email }
            },
            { status: 200 } // OK 
        )

    } catch (error: any) {
        // Para erros inesperados, retorna um erro genérico
        console.error('Erro no login:', error);
        return NextResponse.json(
            { message: 'Erro interno do servidor' },
            { status: 500 } // Internal Server Error 
        )
    }
}

