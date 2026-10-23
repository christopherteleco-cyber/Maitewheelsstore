"use client";

import { useState } from "react";
import Image from "next/image";
export default function Home() {

const [carrito, setCarrito] = useState<string[]>([]);
const [nombre, setNombre] = useState("");
const [correo, setCorreo] = useState("");
const [telefono, setTelefono] = useState("");
const [direccion, setDireccion] = useState("");
const precios: { [key: string]: number } = {
  "Polera Oversize": 10990,
  "Creatina": 24990,
  "Proteína Whey": 3990,
};

const total = carrito.reduce(
  (sum, producto) => sum + precios[producto],
  0
);
  return (
    <main className="min-h-screen bg-black text-white">

      {/* MENÚ SUPERIOR */}
      <nav className="flex justify-between items-center p-6 border-b border-yellow-500">

        <h1 className="text-3xl font-bold text-yellow-500">
          J&K STORE
        </h1>

          <div className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold">
  🛒 Carrito ({carrito.length})
</div>

        <div className="flex gap-6 text-lg">
          <a href="#">Inicio</a>
          <a href="#">Productos</a>
          <a href="#">Suplementos</a>
          <a href="#">Contacto</a>
        </div>

      </nav>

      {/* BANNER PRINCIPAL */}
      <section className="flex flex-col justify-center items-center text-center h-[80vh] px-4">

        <h1 className="text-7xl font-bold text-yellow-500 mb-4">
          J&K STORE
        </h1>

        <h2 className="text-3xl font-semibold">
          Ropa y Medicamentos
        </h2>

        <p className="max-w-2xl mt-6 text-gray-300">
          Compra ropa deportiva y suplementos de calidad
          con despacho a todo Chile.
        </p>

 <a
  href="#productos"
  className="mt-8 bg-yellow-500 text-black px-8 py-4 rounded-xl font-bold hover:bg-yellow-400 inline-block"
>
  Comprar Ahora
</a>
      </section>

      {/* CATEGORÍAS */}
      <section className="px-10 py-16">

        <h2 className="text-4xl font-bold text-center mb-10">
          Categorías
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-zinc-900 p-10 rounded-xl text-center hover:scale-105 transition">
            <div className="text-5xl mb-4">
              👕
            </div>

            <h3 className="text-2xl font-bold">
              Ropa
            </h3>
          </div>

          <div className="bg-zinc-900 p-10 rounded-xl text-center hover:scale-105 transition">
            <div className="text-5xl mb-4">
              💪
            </div>

            <h3 className="text-2xl font-bold">
              Suplementos
            </h3>
          </div>

          <div className="bg-zinc-900 p-10 rounded-xl text-center hover:scale-105 transition">
            <div className="text-5xl mb-4">
              🔥
            </div>

            <h3 className="text-2xl font-bold">
              Ofertas
            </h3>
          </div>

        </div>

      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section
  id="productos"
  className="max-w-7xl mx-auto p-10"
>

<h2 className="text-4xl font-bold text-center mb-10">
Productos Destacados
</h2>

<div className="grid md:grid-cols-3 gap-8">

<div className="bg-zinc-900 rounded-xl p-6">

<Image
  src="/productos/poleras22.jpg"
  alt="Polera"
  width={500}
  height={300}
  className="h-56 w-full object-cover rounded-lg"
/>

<h3 className="mt-4 text-xl font-bold">
Polera
</h3>

<p className="text-yellow-500 text-2xl mt-2">
$10.990
</p>

<button
  onClick={() =>
  setCarrito([...carrito, "Polera Oversize"])
}
  className="w-full mt-4 bg-yellow-500 text-black py-3 rounded-lg font-bold"
>
  Agregar al carrito
</button>

</div>

<div className="bg-zinc-900 rounded-xl p-6">

<Image
  src="/productos/creatina.png"
  alt="Creatina"
  width={500}
  height={300}
  className="h-56 w-full object-cover rounded-lg"
/>

<h3 className="mt-4 text-xl font-bold">
Creatina
</h3>

<p className="text-yellow-500 text-2xl mt-2">
$24.990
</p>

<button
  onClick={() =>
  setCarrito([...carrito, "Creatina"])
}
  className="w-full mt-4 bg-yellow-500 text-black py-3 rounded-lg font-bold"
>
  Agregar al carrito
</button>

</div>

<div className="bg-zinc-900 rounded-xl p-6">

<Image
  src="/productos/medicamentos.png"
  alt="Medicamento"
  width={50}
  height={20}
  className="h-56 w-full object-cover rounded-lg"
/>

<h3 className="mt-4 text-xl font-bold">
Medicamentos
</h3>

<p className="text-yellow-500 text-2xl mt-2">
$3.990
</p>

<button
  onClick={() =>
  setCarrito([...carrito, "Proteína Whey"])
}
  className="w-full mt-4 bg-yellow-500 text-black py-3 rounded-lg font-bold"
>
  Agregar al carrito
</button>

</div>

</div>

</section>

<section className="max-w-4xl mx-auto p-10">

  <h2 className="text-3xl font-bold mb-6">
    Carrito
  </h2>

  {carrito.length === 0 ? (
    <p>No hay productos</p>
  ) : (
    <ul className="space-y-3">

  {carrito.map((producto, index) => (

    <li
      key={index}
      className="bg-zinc-900 p-3 rounded-lg flex justify-between"
    >

      <span>{producto}</span>

     <button
  onClick={() => {
    setCarrito(
      carrito.filter((_, i) => i !== index)
    );
  }}
  className="bg-red-500 px-3 rounded"
>
  X
</button>

    </li>

  ))}

</ul>

  )}

  <div className="mt-6 text-right">

  <h3 className="text-2xl font-bold text-yellow-500">
    Total: ${total.toLocaleString("es-CL")}
  </h3>

  <div className="mt-10 bg-zinc-900 p-6 rounded-xl">

  <h2 className="text-3xl font-bold mb-6">
    Datos del Cliente
  </h2>

  <input
    type="text"
    placeholder="Nombre Completo"
    value={nombre}
    onChange={(e) => setNombre(e.target.value)}
    className="w-full p-3 rounded text-red mb-3"
  />

  <input
    type="email"
    placeholder="Correo"
    value={correo}
    onChange={(e) => setCorreo(e.target.value)}
    className="w-full p-3 rounded text-red mb-3"
  />

  <input
    type="text"
    placeholder="Teléfono"
    value={telefono}
    onChange={(e) => setTelefono(e.target.value)}
    className="w-full p-3 rounded text-red mb-3"
  />

  <input
    type="text"
    placeholder="Dirección"
    value={direccion}
    onChange={(e) => setDireccion(e.target.value)}
    className="w-full p-3 rounded text-red mb-4"
  />

  <button
    onClick={() => {
      alert(
        `Pedido J&K\n\nCliente: ${nombre}\nCorreo: ${correo}\nTeléfono: ${telefono}\nDirección: ${direccion}\n\nTotal: $${total.toLocaleString("es-CL")}`
      );
    }}
    className="w-full bg-green-600 py-4 rounded-lg font-bold"
  >
    Finalizar Compra
  </button>

</div>

</div>

</section>

    </main>
  );
}
