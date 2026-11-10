"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
type Pedido = {
  id: number;
  cliente: string;
  correo: string;
  telefono: string;
  direccion: string;
  productos: string[];
  total: number;
  fecha: string;
};

type Producto = {
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
  imagen: string;
};



export default function Home() {

  const [productos, setProductos] =
  useState<Producto[]>([]);

const [carrito, setCarrito] = useState<string[]>([]);
const [pedidos, setPedidos] = useState<Pedido[]>([]);
const [stock, setStock] = useState(
  Object.fromEntries(
    productos.map((p) => [
      p.nombre,
      p.stock,
    ])
  )
);
const [nombre, setNombre] = useState("");
const [correo, setCorreo] = useState("");
const [telefono, setTelefono] = useState("");
const [direccion, setDireccion] = useState("");

useEffect(() => {

  const productosGuardados =
    localStorage.getItem("productos");

  if (productosGuardados) {

    setProductos(
      JSON.parse(productosGuardados)
    );

  } else {

    setProductos([
      {
        nombre: "Ferrari F40",
        precio: 10990,
        stock: 3,
        categoria: "Ferrari",
        imagen: "/productos/Ferrari F40.png",
      },

      {
        nombre: "Lamborghini Aventador",
        precio: 5990,
        stock: 2,
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

  }

}, []);

const precios: { [key: string]: number } = {
  "Ferrari F40": 10990,
  "Lamborghini Aventador": 5990,
  "Ford Mustang 1967": 3990,
};

const [categoriaSeleccionada, setCategoriaSeleccionada] =
  useState("Todos");

// useEffect(() => {

//  localStorage.setItem(
//  "pedidos",
//    JSON.stringify(pedidos)
//  );

// }, [pedidos]);

const total = carrito.reduce(
  (sum, nombreProducto) => {

    const productoEncontrado =
      productos.find(
        (p) => p.nombre === nombreProducto
      );

    return (
      sum +
      (productoEncontrado?.precio || 0)
    );

  },
  0
);

const finalizarCompra = () => {

  if (carrito.length === 0) {
    alert("Debe agregar productos");
    return;
  }

  if (!nombre || !correo || !telefono || !direccion) {
    alert("Debe completar todos los datos");
    return;
  }

const nuevoPedido = {
  id: pedidos.length + 1,
  cliente: nombre,
  correo,
  telefono,
  direccion,
  productos: carrito,
  total,
  fecha: new Date().toLocaleDateString(
  "es-CL"
),
};

 const pedidosActualizados = [
  ...pedidos,
  nuevoPedido,
];

setPedidos(pedidosActualizados);

localStorage.setItem(
  "pedidos",
  JSON.stringify(pedidosActualizados)
);

fetch("/api/send-order", {

  method: "POST",

  headers: {
    "Content-Type":
      "application/json",
  },

  body: JSON.stringify({

    cliente: nombre,

    correo,

    telefono,

    direccion,

    productos: carrito,

    total,

  }),

});


const clientesGuardados = JSON.parse(
  localStorage.getItem("clientes") || "[]"
);

const nuevoCliente = {
  nombre,
  correo,
  telefono,
  direccion,
};

clientesGuardados.push(nuevoCliente);

localStorage.setItem(
  "clientes",
  JSON.stringify(clientesGuardados)
);

const nuevoStock = { ...stock };

carrito.forEach((producto) => {

  if (nuevoStock[producto] > 0) {

    nuevoStock[producto] -= 1;

  }

});

setStock(nuevoStock);

localStorage.setItem(
  "stock",
  JSON.stringify(nuevoStock)
);
  alert("Pedido creado correctamente");
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
              : "text-orange-400"
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

  setCarrito([]);
};

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500 text-white">

      {/* MENÚ SUPERIOR */}
      <nav className="flex justify-between items-center p-6 border-b border-red-500">

        <h1 className="text-3xl font-bold text-orange-400">
          MAITEWHEELS
        </h1>

          <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold">
  🛒 Carrito ({carrito.length})
</div>

        <div className="flex gap-6 text-lg">
          <a href="#">Inicio</a>
          <a href="#">Ferrari</a>
          <a href="#">Deportivos</a>
          <a href="#">Clásicos</a>
        </div>

      </nav>

      {/* BANNER PRINCIPAL */}
      <section
  className="relative flex flex-col justify-center items-center text-center h-[80vh] px-4 bg-cover bg-center"
  style={{
    backgroundImage: "url('/banner.png')",
  }}
>

  <div className="absolute inset-0 bg-black/75" />

<div className="relative z-10">

  <h1 className="text-7xl font-extrabold text-orange-400 mb-4 drop-shadow-[0_0_15px_rgba(255,100,0,0.8)]">
    MAITEWHEELS
  </h1>


       <h2 className="text-3xl font-semibold">
  Los Mejores Autos de Colección
</h2>

        <p className="max-w-2xl mt-6 text-gray-300">
          Descubre Ferrari, Lamborghini y clásicos únicos para verdaderos apasionados del automovilismo.
        </p>

 <a
  href="#productos"
  className="mt-8 bg-red-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-500 inline-block"
>
           Comprar Ahora
</a>

</div>
      </section>

      {/* CATEGORÍAS */}
      <section className="px-10 py-16">

        <h2 className="text-4xl font-bold text-center mb-10">
          Categorías
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div
  onClick={() =>
    setCategoriaSeleccionada("Ferrari")
  }
  className="bg-zinc-900 p-10 rounded-xl text-center hover:scale-105 transition cursor-pointer"
>
  <div className="text-5xl mb-4">
    🏎️
  </div>

  <h3 className="text-2xl font-bold">
    Ferrari
  </h3>


</div>


  <div className="bg-zinc-900 p-10 rounded-xl text-center hover:scale-105 transition">
     <div
  onClick={() =>
    setCategoriaSeleccionada("Deportivos")
  }
  className="bg-zinc-900 p-10 rounded-xl text-center hover:scale-105 transition cursor-pointer"
>
    <div className="text-5xl mb-4">
    🚗
    </div>

  <h3 className="text-2xl font-bold">
    Deportivos
  </h3>
  
  </div>

        </div>

        <div className="bg-zinc-900 p-10 rounded-xl text-center hover:scale-105 transition">
     
     <div
  onClick={() =>
    setCategoriaSeleccionada("Clásicos")
  }
  className="bg-zinc-900 p-10 rounded-xl text-center hover:scale-105 transition cursor-pointer"
>
  <div className="text-5xl mb-4">
    🚘
  </div>

  <h3 className="text-2xl font-bold">
    Clásicos
  </h3>
</div>

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

<div className="flex justify-center mb-6">

  <button
    onClick={() =>
      setCategoriaSeleccionada("Todos")
    }
    className="bg-red-600 px-6 py-2 rounded-lg font-bold"
  >
    Ver Todos
  </button>

</div>

<div className="grid md:grid-cols-3 gap-8">

{productos
  .filter(
    (producto) =>
      categoriaSeleccionada === "Todos" ||
      producto.categoria === categoriaSeleccionada
  )
  .map((producto) => (

  <div
    key={producto.nombre}
    className="bg-zinc-900 rounded-xl p-6"
  >

    <Image
      src={
  producto.imagen ||
  "/productos/Ferrari F40.png"
}
      alt={producto.nombre}
      width={500}
      height={300}
      className="h-56 w-full object-cover rounded-lg"
    />

    <h3 className="mt-4 text-xl font-bold">
      {producto.nombre}
    </h3>

    <p className="text-orange-400 text-2xl mt-2">
      ${producto.precio.toLocaleString("es-CL")}
    </p>

<p className="text-sm text-gray-400">
  Stock: {producto.stock}
</p>

    <p className="text-xs text-orange-400 mt-2">
      {producto.categoria}
    </p>

    <button
      onClick={() =>
        setCarrito([
          ...carrito,
          producto.nombre,
        ])
      }
      className="w-full mt-4 bg-red-600 text-white py-3 rounded-lg font-bold"
    >
      Agregar al carrito
    </button>

  </div>

))}

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

  <h3 className="text-2xl font-bold text-orange-400">
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
  onClick={finalizarCompra}
  className="w-full bg-green-600 py-4 rounded-lg font-bold"
>
  Finalizar Compra
</button>

<div className="mt-10">

  <h2 className="text-3xl font-bold mb-6">
    Pedidos Generados
  </h2>

<button
  onClick={() => {

    const pedidosGuardados =
      localStorage.getItem("pedidos");



    console.log(pedidosGuardados);

    if (pedidosGuardados) {

      setPedidos(
        JSON.parse(pedidosGuardados)
      );

      

    } else {

      alert("No hay pedidos guardados");

    }

  }}
  className="bg-blue-600 px-4 py-2 rounded-lg mb-4"
>
  Cargar Pedidos Guardados
</button>

  {pedidos.map((pedido) => (

    <div
      key={pedido.id}
      className="bg-zinc-900 p-4 rounded-lg mb-4"
    >

      <p>Cliente: {pedido.cliente}</p>

     <p>
  Total: ${(pedido.total ?? 0).toLocaleString("es-CL")}
</p>

      <p>Fecha: {pedido.fecha}</p>

    </div>

  ))}

</div>

</div>

</div>

</section>

    </main>
  );
}
