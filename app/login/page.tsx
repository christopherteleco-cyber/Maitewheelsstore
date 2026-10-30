"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const iniciarSesion = () => {

  if (
    usuario === "admin" &&
    password === "1234"
  ) {

    localStorage.setItem("auth", "true");

    router.push("/admin");

  } else {

    alert("Credenciales incorrectas");

  }

};

  return (

    <main className="min-h-screen bg-black text-white flex justify-center items-center">

      <div className="bg-zinc-900 p-10 rounded-xl w-[400px]">

        <h1 className="text-4xl font-bold text-yellow-500 mb-6">
          Iniciar Sesión
        </h1>

        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="w-full p-3 rounded text-black mb-4"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded text-black mb-4"
        />

        <button
          onClick={iniciarSesion}
          className="w-full bg-yellow-500 text-black py-3 rounded-lg font-bold"
        >
          Entrar
        </button>

      </div>

    </main>

  );
}
