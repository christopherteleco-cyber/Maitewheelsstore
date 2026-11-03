"use client";

import { useState, useEffect } from "react";
import Link from "next/link";



export default function AdminProductos() {

const [nombre, setNombre] = useState("");

const [precio, setPrecio] = useState("");

const [stockNuevo, setStockNuevo] = useState("");

const [categoria, setCategoria] = useState("Ferrari");

const [productos, setProductos] = useState([
  {
    nombre: "Ferrari F40",
    precio: 10990,
    stock: 2,
    categoria: "Ferrari",
    imagen: "/productos/Ferrari F40.png",
  },

  {
    nombre: "Lamborghini Aventador",
    precio: 5990,
    stock: 3,
    categoria: "Deportivos",
    imagen: "/productos/LAMBO.png",
  },

  {
    nombre: "Ford Mustang 1967",
    precio: 3990,
    stock: 5,
    categoria: "Clásicos",
    imagen: "/productos/Ford Mustang.png",
  },
]);

useEffect(() => {

  const productosGuardados =
    localStorage.getItem("productos");

  if (productosGuardados) {

    setProductos(
      JSON.parse(productosGuardados)
    );

  }

}, []);

const agregarProducto = () => {

  if (!nombre) return;

const productosActualizados = [
  ...productos,
{
  nombre,
  precio: Number(precio),
  stock: Number(stockNuevo),
  categoria,

  imagen:
    categoria === "Ferrari"
      ? "/productos/Ferrari F40.png"
      : categoria === "Deportivos"
      ? "/productos/LAMBO.png"
      : "/productos/Ford Mustang.png",
}
,
];

setProductos(productosActualizados);

localStorage.setItem(
  "productos",
  JSON.stringify(productosActualizados)
);

  setNombre("");
  setPrecio("");
  setStockNuevo("");

};

const eliminarProducto = (
  nombreProducto: string
) => {

  const productosActualizados =
    productos.filter(
      (producto) =>
        producto.nombre !== nombreProducto
    );

  setProductos(productosActualizados);

  localStorage.setItem(
    "productos",
    JSON.stringify(productosActualizados)
  );

};

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold text-yellow-500 mb-10">
        Administración de Productos
      </h1>

      <div className="grid md:grid-cols-3 gap-4 mb-10">

  <div className="bg-zinc-900 p-6 rounded-xl">

    <p className="text-gray-400">
      Productos
    </p>

{productos.length}
    
  </div>

  <div className="bg-zinc-900 p-6 rounded-xl">

    <p className="text-gray-400">
      Stock Total
    </p>

    <h2 className="text-3xl font-bold">
      {productos.reduce(
  (total, producto) =>
    total + producto.stock,
  0
)}
    </h2>

  </div>

  <div className="bg-zinc-900 p-6 rounded-xl">

    <p className="text-gray-400">
      Inventario Bajo
    </p>

    <h2 className="text-3xl font-bold text-yellow-500">
      1
    </h2>

  </div>

</div>

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

      <div className="bg-zinc-900 p-6 rounded-xl mb-10">

        <h2 className="text-2xl font-bold mb-4">
          Nuevo Producto
        </h2>

<input
  type="text"
  placeholder="Nombre"
  value={nombre}
  onChange={(e) => setNombre(e.target.value)}
  className="w-full p-3 rounded bg-white text-black mb-3"
/>


<input
  type="number"
  placeholder="Precio"
  value={precio}
  onChange={(e) => setPrecio(e.target.value)}
  className="w-full p-3 rounded bg-white text-black mb-3"
/>

<input
  type="number"
  placeholder="Stock"
  value={stockNuevo}
  onChange={(e) => setStockNuevo(e.target.value)}
  className="w-full p-3 rounded bg-white text-black mb-3"
/>

<select
  value={categoria}
  onChange={(e) =>
    setCategoria(e.target.value)
  }
  className="w-full p-3 rounded bg-white text-black mb-3"
>

  <option value="Ferrari">
    Ferrari
  </option>

  <option value="Deportivos">
    Deportivos
  </option>

  <option value="Clásicos">
    Clásicos
  </option>

</select>

<button
  onClick={agregarProducto}
  className="bg-green-600 px-6 py-3 rounded-lg font-bold"
>
  Guardar Producto
</button>

      </div>

      <div className="bg-zinc-900 p-6 rounded-xl">

        <h2 className="text-2xl font-bold mb-6">
          Productos Registrados
        </h2>

        <div className="space-y-8">

{["Ferrari", "Deportivos", "Clásicos"].map(
  (categoria) => (

    <div
      key={categoria}
      className="bg-zinc-800 p-6 rounded-xl"
    >

      <h3 className="text-xl font-bold text-orange-400 mb-4">
        {categoria}
      </h3>

      {productos
        .filter(
          (p) =>
            p.categoria === categoria
        )
        .map((producto) => (

          <div
            key={producto.nombre}
            className="flex justify-between border-b border-zinc-700 py-2"
          >

            <span>
              {producto.nombre}
            </span>

<div className="flex gap-3 items-center">

  <span>
    Stock: {producto.stock}
  </span>

<button
  onClick={() =>
    eliminarProducto(
      producto.nombre
    )
  }
  className="bg-red-600 px-3 py-1 rounded"
>
  Eliminar
</button>

</div>


          </div>

        ))}

    </div>

))}

        
        </div>
    

      </div>

    </main>
  );
}