import Link from "next/link";

export default function InventarioPage() {
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

            <tr>

              <td className="p-3">
                Polera Oversize
              </td>

              <td className="p-3">
                25
              </td>

              <td className="p-3 text-green-500">
                Disponible
              </td>

            </tr>

            <tr>

              <td className="p-3">
                Creatina
              </td>

              <td className="p-3">
                40
              </td>

              <td className="p-3 text-green-500">
                Disponible
              </td>

            </tr>

            <tr>

              <td className="p-3">
                Proteína Whey
              </td>

              <td className="p-3">
                5
              </td>

              <td className="p-3 text-yellow-500">
                Stock Bajo
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </main>
  );
}