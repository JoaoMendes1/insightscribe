'use client' // Necessário para usar hooks como useState e useRouter

import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
    // Estados para email e senha (Mesmo padrão do cadastro)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null); // Estado para erros

    const router = useRouter(); // Para redirecionamento futuro

    // Função onSubmit (POR ENQUANO VAZIA, SÓ PREVINE RECARREGAMENTO)
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        console.log('Dados do login:', { email, password }); // Apenas para teste inicial
        // A lógica de chamar a API de login na próxima tarefa 
        // setError('Funcionalidade ainda não implementada'); 
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md rounded-lg bg-zinc-800 p-8 shadow-md">
                <h1 className="mb-6 text-center text-3xl font-bold text-white">
                    Fazer login {/* Título alterado */}
                </h1>

                {/* Área de erro */}
                {error && (
                    <div className="mb-4 rounded-md bg-red-900 p-3 text-center text-sm text-red-200">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email"
                            className='mb-2 block text-sm font-medium text-zinc-300'>
                            Email
                        </label>
                        <input
                            type="text"
                            id='email'
                            name='email'
                            className='w-full rounded-md border-zinc-700 bg-zinc-700 p-2.5 text-white focus:border-blue-500 focus:ring-blue-500'
                            placeholder='Digite seu e-mail'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor=""
                            className=''
                        >
                            Senha
                        </label>

                        <input
                            type="password"
                            id='password'
                            name='password'
                            className='w-full rounded-md border-zinc-700 bg-zinc-700 p-2.5 text-white focus:border-blue-500 focus:ring-blue-500'
                            placeholder='Digite sua senha'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type='submit'
                        className='w-full rounded-lg bg-blue-600 p-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800'
                    >
                        Login {/* Texto do botão alterado */}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-zinc-400">
                    Ainda não tem conta? {' '} {/* Texto e link alterados */}
                    <Link href='/sign-up' className='font-medium text-blue-500 hover:underline'>
                        Crie uma conta
                    </Link>
                </p>
            </div>
        </div>
    )
}