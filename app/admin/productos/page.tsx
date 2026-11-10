"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
  imagen: string;
};

export default function AdminProductos() {

const [nombre, setNombre] = useState("");

const [precio, setPrecio] = useState("");

const [stockNuevo, setStockNuevo] = useState("");

const [categoria, setCategoria] = useState("Ferrari");

const [imagen, setImagen] = useState("");

const [productoEditando, setProductoEditando] =
  useState<string | null>(null);


const [productos, setProductos] =
  useState<Producto[]>([]);

useEffect(() => {

  const cargarProductos =
    async () => {

      try {

        const respuesta =
          await fetch(
            "/api/productos"
          );

        const datos =
          await respuesta.json();

        setProductos(
          datos
        );

      } catch (error) {

        console.error(
          "Error cargando productos:",
          error
        );

      }

    };

  cargarProductos();

}, []);

const agregarProducto = async () => {

  if (!nombre) return;

  try {

    const nuevoProducto = {

      nombre,

      precio: Number(precio),

      stock: Number(stockNuevo),

      categoria,

      imagen:
        imagen !== ""
          ? `/productos/${imagen}`
          : categoria === "Ferrari"
          ? "/productos/Ferrari F40.png"
          : categoria === "Deportivos"
          ? "/productos/LAMBO.png"
          : "/productos/Ford Mustang.png",

    };

    const respuesta =
      await fetch(
        "/api/productos",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            nuevoProducto
          ),
        }
      );

    const productoCreado =
      await respuesta.json();

    setProductos([
      ...productos,
      productoCreado,
    ]);

    setNombre("");
    setPrecio("");
    setStockNuevo("");
    setImagen("");

  } catch (error) {

    console.error(
      "Error creando producto:",
      error
    );

  }

};

const editarProducto = (producto: {
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
  imagen: string;
}) => {

  setNombre(producto.nombre);

  setPrecio(
    producto.precio.toString()
  );

  setStockNuevo(
    producto.stock.toString()
  );

  setCategoria(
    producto.categoria
  );

  setImagen(
    producto.imagen
      ?.replace("/productos/", "")
      || ""
  );

  setProductoEditando(
    producto.nombre
  );

};

const actualizarProducto =
  async () => {

    const productoOriginal =
      productos.find(
        (producto) =>
          producto.nombre ===
          productoEditando
      );

    if (!productoOriginal)
      return;

    try {

      const respuesta =
        await fetch(
          "/api/productos",
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              {
                id:
                  productoOriginal.id,

                nombre,

                precio:
                  Number(precio),

                stock:
                  Number(stockNuevo),

                categoria,

                imagen:
                  imagen !== ""
                    ? `/productos/${imagen}`
                    : productoOriginal.imagen,
              }
            ),
          }
        );

      const productoActualizado =
        await respuesta.json();

      setProductos(
        productos.map(
          (producto) =>
            producto.id ===
            productoActualizado.id
              ? productoActualizado
              : producto
        )
      );

      setProductoEditando(
        null
      );

      setNombre("");
      setPrecio("");
      setStockNuevo("");
      setImagen("");

    } catch (error) {

      console.error(
        "Error actualizando producto:",
        error
      );

    }

  };

  const eliminarProducto =
  async (id: number) => {

    try {

      await fetch(
        "/api/productos",
        {
          method: "DELETE",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            id,
          }),
        }
      );

      setProductos(
        productos.filter(
          (producto) =>
            producto.id !== id
        )
      );

    } catch (error) {

      console.error(
        "Error eliminando producto:",
        error
      );

    }

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

<h2 className="text-3xl font-bold">
  {productos.length}
</h2>
    
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
  {
    productos.filter(
      (producto) =>
        producto.stock <= 2
    ).length
  }
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

<input
  type="text"
  placeholder="Imagen (ej: ferrari-enzo.jpg)"
  value={imagen}
  onChange={(e) =>
    setImagen(e.target.value)
  }
  className="w-full p-3 rounded bg-white text-black mb-3"
/>

<button
  onClick={
    productoEditando
      ? actualizarProducto
      : agregarProducto
  }
  className="bg-green-600 px-6 py-3 rounded-lg font-bold"
>
  {
    productoEditando
      ? "Actualizar Producto"
      : "Guardar Producto"
  }
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
.sort(
  (a, b) =>
    a.stock - b.stock
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

<div className="flex flex-col">

  <span
    className={
      producto.stock <= 2
        ? "text-red-400"
        : "text-green-400"
    }
  >
    Stock: {producto.stock}
  </span>

  <span
  className={
    producto.stock <= 2
      ? "text-red-400 text-sm"
      : "text-green-400 text-sm"
  }
>
  {
    producto.stock <= 2
      ? "⚠ Stock Bajo"
      : "✅ Disponible"
  }
</span>


  <span
    className={
      producto.stock <= 2
        ? "text-red-400"
        : "text-green-400"
    }
  >
    {producto.stock <= 2
      ? "Stock Bajo"
      : "Disponible"}
  </span>

</div>

  <button
  onClick={() =>
    editarProducto(producto)
  }
  className="bg-yellow-500 text-black px-3 py-1 rounded"
>
  Editar
</button>

<button
  onClick={() =>
    eliminarProducto(
      producto.id
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