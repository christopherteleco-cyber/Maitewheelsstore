import Link from "next/link";

export default function AdminProductos() {
  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold text-yellow-500 mb-10">
        Administración de Productos
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

      <div className="bg-zinc-900 p-6 rounded-xl mb-10">

        <h2 className="text-2xl font-bold mb-4">
          Nuevo Producto
        </h2>

        <input
          type="text"
          placeholder="Nombre"
          className="w-full p-3 rounded text-red mb-3"
        />

        <input
          type="number"
          placeholder="Precio"
          className="w-full p-3 rounded text-red mb-3"
        />

        <input
          type="number"
          placeholder="Stock"
          className="w-full p-3 rounded text-red mb-3"
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

        <table className="w-full">

          <thead>
            <tr className="border-b border-zinc-700">
              <th className="text-left p-3">Producto</th>
              <th className="text-left p-3">Precio</th>
              <th className="text-left p-3">Stock</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td className="p-3">Polera Oversize</td>
              <td className="p-3">$19.990</td>
              <td className="p-3">25</td>
            </tr>

            <tr>
              <td className="p-3">Creatina</td>
              <td className="p-3">$24.990</td>
              <td className="p-3">40</td>
            </tr>

          </tbody>

        </table>

      </div>

    </main>
  );
}