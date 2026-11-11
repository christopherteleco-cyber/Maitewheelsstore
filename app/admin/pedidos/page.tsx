"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Pedido = {
  id: number;
  cliente: string;
  correo: string;
  telefono: string;
  direccion: string;
  productos: string[] | string;
  total: number;
  fecha: string;
  estado: string;
};

export default function AdminPedidos() {

const [pedidos, setPedidos] = useState<Pedido[]>([]);

const actualizarEstado =
  async (
    id: number,
    estado: string
  ) => {

    try {

      await fetch(
        "/api/pedidos",
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            id,
            estado,
          }),
        }
      );

      setPedidos(
        pedidos.map(
          (pedido) =>
            pedido.id === id
              ? {
                  ...pedido,
                  estado,
                }
              : pedido
        )
      );

    } catch (error) {

      console.error(
        "Error actualizando estado:",
        error
      );

    }

  };

useEffect(() => {

  const cargarPedidos =
    async () => {

      try {

        const respuesta =
          await fetch(
            "/api/pedidos"
          );

        const datos =
          await respuesta.json();

        setPedidos(
          datos
        );

      } catch (error) {

        console.error(
          "Error cargando pedidos:",
          error
        );

      }

    };

  cargarPedidos();

}, []);


  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold text-yellow-500 mb-10">
        Gestión de Pedidos
      </h1>

<div className="flex gap-4 mb-10">

  <Link
    href="/admin"
    className="bg-zinc-700 text-white px-4 py-2 rounded-lg"
  >
    Dashboard
  </Link>

  <Link
    href="/admin/productos"
    className="bg-zinc-700 text-white px-4 py-2 rounded-lg"
  >
    Productos
  </Link>

  <Link
    href="/admin/pedidos"
    className="bg-zinc-700 text-white px-4 py-2 rounded-lg"
  >
    Pedidos
  </Link>

  <Link
    href="/"
    className="bg-zinc-700 text-white px-4 py-2 rounded-lg"
  >
    Ver Tienda
  </Link>

</div>

      <div className="bg-zinc-900 rounded-xl p-6">

        <h2 className="text-3xl font-bold mb-6">
          Pedidos Recibidos
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b border-zinc-700">

              <th className="text-left p-3">
                Pedido
              </th>

              <th className="text-left p-3">
                Cliente
              </th>

              <th className="text-left p-3">
                Total
              </th>

              <th className="text-left p-3">
                Estado
              </th>

            </tr>

          </thead>

<tbody>

  {pedidos.map((pedido) => (

    <tr
      key={pedido.id}
      className="border-b border-zinc-800"
    >

      <td className="p-3">
        #{pedido.id}
      </td>

      <td className="p-3">
        {pedido.cliente}
      </td>

 <td className="p-3">
  ${(pedido.total ?? 0).toLocaleString("es-CL")}
</td>

<td className="p-3">
  {typeof pedido.productos === "string"
    ? JSON.parse(
        pedido.productos
      ).join(", ")
    : pedido.productos?.join(", ")}
</td>

     <td className="p-3">

<select
  className="bg-zinc-800 p-2 rounded"
  value={
    pedido.estado ||
    "Pendiente"
  }
  onChange={(e) =>
    actualizarEstado(
      pedido.id,
      e.target.value
    )
  }
>

    <option>
      Pendiente
    </option>

    <option>
      Pagado
    </option>

    <option>
      Preparando
    </option>

    <option>
      Enviado
    </option>

    <option>
      Entregado
    </option>

    <option>
      Cancelado
    </option>

  </select>


</td>

    </tr>

  ))}

</tbody>

        </table>

      </div>

    </main>
  );
}