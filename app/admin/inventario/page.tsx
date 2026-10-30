"use client";

import { useState } from "react";
import Link from "next/link";

type Stock = {
  [key: string]: number;
};

export default function InventarioPage() {

const [stock, setStock] = useState<Stock>({});

const cargarStock = () => {

  const datos =
    localStorage.getItem("stock");

  if (datos) {

    setStock(
      JSON.parse(datos)
    );

  } else {

    alert("No hay stock guardado");

  }

};

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold text-yellow-500 mb-10">
        Inventario
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
          className="bg-zinc-700 px-4 py-2 rounded"
        >
          Clientes
        </Link>

      </div>

      <div className="bg-zinc-900 rounded-xl p-6">

        <h2 className="text-3xl font-bold mb-6">
          Stock Disponible
        </h2>

        <button
  onClick={cargarStock}
  className="bg-blue-600 px-4 py-2 rounded-lg mb-6"
>
  Cargar Stock Real
</button>

        <table className="w-full">

          <thead>

            <tr className="border-b border-zinc-700">

              <th className="text-left p-3">
                Producto
              </th>

              <th className="text-left p-3">
                Stock
              </th>

              <th className="text-left p-3">
                Estado
              </th>

            </tr>

          </thead>

        <tbody>

  {Object.entries(stock).map(
    ([producto, cantidad]) => (

      <tr
        key={producto}
        className="border-b border-zinc-800"
      >

        <td className="p-3">
          {producto}
        </td>

        <td className="p-3">
          {cantidad}
        </td>

        <td
          className={`p-3 ${
            cantidad > 5
              ? "text-green-500"
              : "text-yellow-500"
          }`}
        >
          {cantidad > 5
            ? "Disponible"
            : "Stock Bajo"}
        </td>

      </tr>

    )
  )}

</tbody>

        </table>

      </div>

    </main>
  );
}