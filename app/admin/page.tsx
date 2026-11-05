"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Cliente = {
  nombre: string;
  correo: string;
  telefono: string;
  direccion: string;
};

type Producto = {
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
  imagen: string;
};

export default function AdminPage() {

const router = useRouter();

const [clientes, setClientes] =
  useState<Cliente[]>([]);

type Pedido = {
  cliente: string;
  total: number;
  fecha: string;
};

const [pedidos, setPedidos] = useState<Pedido[]>([]);

const ventasTotales = pedidos.reduce(
  (total, pedido) =>
    total + (pedido.total || 0),
  0
);


const [productos, setProductos] =
  useState<Producto[]>([]);

const productosCriticos =
  productos.filter(
    (producto) =>
      producto.stock <= 2
  );


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

<h2 className="text-lg">
  Ventas Totales
</h2>

<p className="text-4xl font-bold text-green-500">
  $
  {ventasTotales.toLocaleString(
    "es-CL"
  )}
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

        <div className="mt-10 bg-zinc-900 rounded-xl p-6">

  <h2 className="text-3xl font-bold mb-6">
    Últimos Clientes
  </h2>

  <div className="mt-10 bg-zinc-900 rounded-xl p-6">

  <h2 className="text-3xl font-bold mb-6 text-red-400">
    Inventario Crítico
  </h2>

  {productosCriticos.length === 0 ? (

    <p>
      No existen productos con stock bajo.
    </p>

  ) : (

    <div className="space-y-4">

{productosCriticos.map(
  (producto) => (

    <div
      key={producto.nombre}
      className="border border-red-500 rounded-lg p-4"
    >

      <h3 className="font-bold">
        {producto.nombre}
      </h3>

      <p>
        Categoría: {producto.categoria}
      </p>

      <p className="text-red-400">
        Stock: {producto.stock}
      </p>

    </div>

  )
)}

    </div>

  )}

</div>

  <table className="w-full">

    <thead>

      <tr className="border-b border-zinc-700">

        <th className="text-left p-3">
          Nombre
        </th>

        <th className="text-left p-3">
          Correo
        </th>

        <th className="text-left p-3">
          Teléfono
        </th>

        <th className="text-left p-3">
          Dirección
        </th>

      </tr>

    </thead>

    <tbody>

      {clientes
        .slice()
        .reverse()
        .slice(0, 5)
        .map((cliente, index) => (

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
              {cliente.direccion}
            </td>

          </tr>

        ))}

    </tbody>

  </table>

</div>

        <h2 className="text-3xl font-bold mb-6">
          Últimos Pedidos
        </h2>

        <table className="w-full">

          <thead>
            <tr className="border-b border-zinc-700">

<th className="text-left p-3">
  Cliente
</th>

<th className="text-left p-3">
  Total
</th>

<th className="text-left p-3">
  Fecha
</th>

<th className="text-left p-3">
  Estado
</th>
            </tr>
         
       </thead>

  <tbody>

  {pedidos
    .slice()
    .reverse()
    .slice(0, 5)
    .map((pedido, index) => (

      <tr
        key={index}
        className="border-b border-zinc-800"
      >

        <td className="p-3">
          {pedido.cliente}
        </td>

<td className="p-3">
  $
  {(pedido.total ?? 0)
    .toLocaleString("es-CL")}
</td>

<td className="p-3">
  {pedido.fecha}
</td>

<td className="p-3 text-green-500">
  Registrado
</td>

      </tr>

    ))}

</tbody>


        </table>

      </div>

    </main>
  );
}