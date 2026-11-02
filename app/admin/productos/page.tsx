import Link from "next/link";

export default function AdminProductos() {

  const productos = [
  {
    nombre: "Ferrari F40",
    precio: 10990,
    stock: 2,
    categoria: "Ferrari",
  },

  {
    nombre: "Lamborghini Aventador",
    precio: 5990,
    stock: 3,
    categoria: "Deportivos",
  },

  {
    nombre: "Ford Mustang 1967",
    precio: 3990,
    stock: 5,
    categoria: "Clásicos",
  },
];

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
      2
    </h2>
  </div>

  <div className="bg-zinc-900 p-6 rounded-xl">
    <p className="text-gray-400">
      Stock Total
    </p>

    <h2 className="text-3xl font-bold">
      10
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
          className="w-full p-3 rounded bg-white text-black mb-3"
        />

        <input
          type="number"
          placeholder="Precio"
          className="w-full p-3 rounded bg-white text-black mb-3"
        />

        <input
          type="number"
          placeholder="Stock"
          className="w-full p-3 rounded bg-white text-black mb-3"
        />

        <button
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

            <span>
              Stock:
              {" "}
              {producto.stock}
            </span>

          </div>

        ))}

    </div>

))}

        
        </div>
    

      </div>

    </main>
  );
}