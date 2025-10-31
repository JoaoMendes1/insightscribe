"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

export const UserButton = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Garante atualização imediata do estado da sessão após login/logout
  useEffect(() => {
    router.refresh();
  }, [status, router]);

  if (status === "loading") {
    return <div className="text-gray-400 animate-pulse">Verificando sessão...</div>;
  }

  if (status === "authenticated") {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-300">{session.user?.email}</span>
        <button
          onClick={async () => {
            await signOut({ redirect: false });
            router.push("/sign-in");
            router.refresh(); // 🔥 força revalidação do SessionProvider
          }}
          className="px-3 py-1 bg-red-500 rounded hover:bg-red-600"
        >
          Sair
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/sign-in"
      className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600"
    >
      Login
    </Link>
  );
};
