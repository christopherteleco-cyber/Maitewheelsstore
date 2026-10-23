import Link from "next/link";

export default function ConfiguracionPage() {
  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold text-yellow-500 mb-10">
        Configuración de la Tienda
      </h1>

      <div className="flex gap-4 mb-10">

  <Link href="/admin" className="bg-zinc-700 text-white px-4 py-2 rounded-lg">
    Dashboard
  </Link>

  <Link href="/admin/productos" className="bg-zinc-700 text-white px-4 py-2 rounded-lg">
    Productos
  </Link>

  <Link href="/admin/pedidos" className="bg-zinc-700 text-white px-4 py-2 rounded-lg">
    Pedidos
  </Link>

  <Link href="/admin/clientes" className="bg-zinc-700 text-white px-4 py-2 rounded-lg">
    Clientes
  </Link>

  <Link href="/" className="bg-zinc-700 text-white px-4 py-2 rounded-lg">
    Ver Tienda
  </Link>

</div>

      <div className="bg-zinc-900 p-8 rounded-xl">

        <div className="mb-4">

          <label className="block mb-2">
            Nombre de la Tienda
          </label>

          <input
            type="text"
            defaultValue="J&K Store"
            className="w-full p-3 rounded text-black"
          />

        </div>

        <div className="mb-4">

          <label className="block mb-2">
            Correo
          </label>

          <input
            type="email"
            placeholder="ventas@jkstore.cl"
            className="w-full p-3 rounded text-black"
          />

        </div>

        <div className="mb-4">

          <label className="block mb-2">
            WhatsApp
          </label>

          <input
            type="text"
            placeholder="+56 9 1234 5678"
            className="w-full p-3 rounded text-black"
          />

        </div>

        <div className="mb-4">

          <label className="block mb-2">
            Instagram
          </label>

          <input
            type="text"
            placeholder="@jkstore"
            className="w-full p-3 rounded text-black"
          />

        </div>

        <button
          className="bg-green-600 px-8 py-3 rounded-lg font-bold"
        >
          Guardar Cambios
        </button>

      </div>

    </main>
  );
}