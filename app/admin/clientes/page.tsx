"use client";

import { useState } from "react";
import Link from "next/link";

type Cliente = {
  nombre: string;
  correo: string;
  telefono: string;
  direccion: string;
};

export default function AdminClientes() {

  const [clientes, setClientes] =
  useState<Cliente[]>([]);

const cargarClientes = () => {

  const datos =
    localStorage.getItem("clientes");

  if (datos) {

    setClientes(
      JSON.parse(datos)
    );

  } else {

    alert("No hay clientes guardados");

  }

};

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold text-yellow-500 mb-10">
        Gestión de Clientes
      </h1>

      <div className="flex gap-4 mb-10">

        <Link
          href="/admin"
          className="bg-zinc-700 px-4 py-2 rounded"
        >
          Dashboard
        </Link>

        <Link
          href="/admin/productos"
          className="bg-zinc-700 px-4 py-2 rounded"
        >
          Productos
        </Link>

        <Link
          href="/admin/pedidos"
          className="bg-zinc-700 px-4 py-2 rounded"
        >
          Pedidos
        </Link>

        <Link
          href="/admin/clientes"
          className="bg-yellow-500 text-black px-4 py-2 rounded"
        >
          Clientes
        </Link>

      </div>

      <div className="bg-zinc-900 rounded-xl p-6">

        <h2 className="text-3xl font-bold mb-6">
          Clientes Registrados
        </h2>

        <button
  onClick={cargarClientes}
  className="bg-blue-600 px-4 py-2 rounded-lg mb-6"
>
  Cargar Clientes Reales
</button>

        <table className="w-full">

          <thead>

            <tr className="border-b border-zinc-700">

              <th className="text-left p-3">Cliente</th>
              <th className="text-left p-3">Correo</th>
              <th className="text-left p-3">Teléfono</th>
              <th className="text-left p-3">Compras</th>

            </tr>

          </thead>

          <tbody>

  {clientes.map((cliente, index) => (

    <tr
      key={index}
      className="border-b border-zinc-800"
    >

      <td className="p-3">
        {cliente.nombre}
      </td>

      <td className="p-3">
        {cliente.correo}
      </td>

      <td className="p-3">
        {cliente.telefono}
      </td>

      <td className="p-3">
        1
      </td>

    </tr>

  ))}

</tbody>

        </table>

      </div>

    </main>
  );
}