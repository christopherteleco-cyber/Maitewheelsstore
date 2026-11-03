"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

const [clientes, setClientes] = useState([]);

const [pedidos, setPedidos] = useState([]);

const [productos, setProductos] = useState([]);

useEffect(() => {


  const auth = localStorage.getItem("auth");

  if (auth !== "true") {
    router.push("/login");
  }

const clientesGuardados =
  localStorage.getItem("clientes");

if (clientesGuardados) {

  setClientes(
    JSON.parse(clientesGuardados)
  );

}

const pedidosGuardados =
  localStorage.getItem("pedidos");

if (pedidosGuardados) {

  setPedidos(
    JSON.parse(pedidosGuardados)
  );

}

const productosGuardados =
  localStorage.getItem("productos");

if (productosGuardados) {

  setProductos(
    JSON.parse(productosGuardados)
  );

}

}, [router]);

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold text-yellow-500 mb-10">
        Dashboard MAITEWHEELS
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

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-zinc-900 p-6 rounded-xl">

       <h2 className="text-lg">Pedidos</h2>

<p className="text-4xl font-bold text-yellow-500">
  {pedidos.length}
</p>

        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-lg">Ventas Hoy</h2>
          <p className="text-4xl font-bold text-green-500">
            $550.000
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          
          <h2 className="text-lg">Clientes</h2>

<p className="text-4xl font-bold text-blue-500">
  {clientes.length}
</p>

          
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">

<h2 className="text-lg">Productos</h2>
<p className="text-4xl font-bold text-red-500">
  {productos.length}
</p>

        </div>

      </div>

      <div className="mt-10 bg-zinc-900 rounded-xl p-6">

        <h2 className="text-3xl font-bold mb-6">
          Últimos Pedidos
        </h2>

        <table className="w-full">

          <thead>
            <tr className="border-b border-zinc-700">
              <th className="text-left p-3">Cliente</th>
              <th className="text-left p-3">Total</th>
              <th className="text-left p-3">Estado</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td className="p-3">Christopher Méndez</td>
              <td className="p-3">$84.970</td>
              <td className="p-3 text-yellow-500">
                Pendiente
              </td>
            </tr>

            <tr>
              <td className="p-3">Juan Pérez</td>
              <td className="p-3">$39.990</td>
              <td className="p-3 text-green-500">
                Pagado
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </main>
  );
}