'use client' //IMPORTANTE: Marca este como um "Client Component"

import Link from 'next/link'
import React, { useState } from 'react' // Para gerenciar o estado do formulário
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  // Estados para guardar email, senha e erro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Estado para mensagem de erro

  // Hook para navegação
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Previne o regarregamento padrão da página ao submetwr o form 
    event.preventDefault();
    setError(null); // Limpa erros anteriores 

    try {
      // Faz a requisição POST para a nossa API 
      const response = await fetch('/api/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Envia email e senha no corpo
      });

      //Pega a resposta da API em formato JSON 
      const data = await response.json();

      // Verifica se a API respondeu com o erro (status diferente de 2xx ou 3xx)
      if (!response.ok) {
        // Se deu erro, define a mensagem de erro no estado
        setError(data.message || 'Erro ao cadastrar');
      } else {
        // Se deu sucesso (Status 201 Created)
        console.log('Usuário cadastrado', data.user);
        //Redireciona para a página de login (ou outra página de sucesso)
        router.push('/sign-in');
      }
    } catch (fetchError) {
      // Se houver erro na própria aquisição (ex: rede caiu)
      setError('Não foi possível conectar ao servidor.');
      console.error('Fetch error:', fetchError);
    }

  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-zinc-800 p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          Criar sua conta
        </h1>

        {/* Área para exibir a mensagem de erro */}
        {error && (
          <div className= "mb-4 rounded-md bg-red-900 p-3 text-center text-sm text-red-200">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit} >
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-300">
              Email
            </label>

            <input type="email"
              name="email"
              id="email"
              className="w-full rounded-md border-zinc-700 bg-zinc-700 p-2.5 text-white focus:border-blue-500 focus:ring-blue-500"
              placeholder='Digite seu e-mail'
              value={email} // Conecta o valor do input ao estado 'email'
              onChange={(e) => setEmail(e.target.value)} // Atualiza o Estado 'email quando o usuário digita
               />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-300">
              Senha
            </label>
            <input type="password"
              name="password"
              id="password"
              className="w-full rounded-md border-zinc-700 bg-zinc-700 p-2.5 text-white focus:border-blue-500 focus:ring-blue-500"
              placeholder='Digite sua senha' 
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Atualiza o estado 'password'
              />
          </div>

          <button type="submit" className="w-full rounded-lg bg-blue-600 p-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800" >
            Cadastrar
          </button>
        </form>

        <p className="mt-6">
          Já tem uma conta? {' '}
          <Link href="/sign-in" className="font-medium text-blue-500 hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  )
}