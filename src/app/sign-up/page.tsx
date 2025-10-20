import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-zinc-800 p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          Criar sua conta
        </h1>

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-300">
              Email
            </label>

            <input type="email" 
                   name="email" 
                   id="email" 
                   className="w-full rounded-md border-zinc-700 bg-zinc-700 p-2.5 text-white focus:border-blue-500 focus:ring-blue-500" 
                   placeholder='Digite seu e-mail'/>
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-300">
              Senha
            </label>
            <input type="password" 
                   name="password" 
                   id="password"
                   className="w-full rounded-md border-zinc-700 bg-zinc-700 p-2.5 text-white focus:border-blue-500 focus:ring-blue-500" 
                   placeholder='Digite sua senha'/>
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