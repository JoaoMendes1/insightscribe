import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { json } from 'stream/consumers'

export async function POST(request: NextRequest) {
    try{
        // 1. Ler os dados do corpo da requisição
        const body = await request.json()
        const { email, password } = body

        // 2. Validar se os dados vieram 
        if (!email || !password) {
            return NextResponse.json(
                {message: 'email e senha são obrigatórios'}, 
                { status: 400 } // 400 = Bad Request
            )
        }

        // 3. Criptografar a senha 
        const hashedPassword = await bcrypt.hash(password, 10)

        // 4. Salvar o novo usuário no banco de dados
        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
            },
        })

        // 5. Retornar uma resposta de sucesso
        // (Não retornarmos a senha, nem a criptografada!)
        return NextResponse.json(
            {
                message: 'Usuário criado com sucesso!',
                user: { id: newUser.id, email: newUser.email }
            },
            { status: 201 } // 201 = Created
        )

    } catch (error: any ) {
        // 6. Lidar com erros (ex: email já existe)

        // Código P2002 é o erro do Prisma para "Violação de restrição única"
        if (error.code === 'P2002') {
            return NextResponse.json(
                { message: 'Este email já está em uso' }, 
                { status: 409 } // 409 = Conflict
            )
        }

        // Para outros erros, retorna um erro genérico
        console.error(error); // Loga o erro no console do servidor 
        return NextResponse.json(
            { message: 'Erro interno do servidor' },
            { status: 500 } // 500 = Internal Server Error
        )
    }

}