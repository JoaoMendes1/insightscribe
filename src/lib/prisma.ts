/* 
Impede que o Next.js, em ambiente de desenvolvimento, crie centenas de conexões 
novas com o banco de dados a cada "Hot Reload".
*/

import { PrismaClient } from '@prisma/client'
import { projectCompilationEventsSubscribe } from 'next/dist/build/swc/generated-native'

const prismaClientSignLeton = () => {
    return new PrismaClient()
}

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSignLeton>
}

const prisma = globalThis.prisma ?? prismaClientSignLeton()

export default prisma 

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma 


