export default function ReportesPage() {
  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold text-yellow-500 mb-10">
        Reportes y Estadísticas
      </h1>

      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-lg">Ventas Hoy</h2>
          <p className="text-4xl text-green-500 font-bold">
            $120.000
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-lg">Ventas Mes</h2>
          <p className="text-4xl text-blue-500 font-bold">
            $2.550.000
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-lg">Pedidos</h2>
          <p className="text-4xl text-yellow-500 font-bold">
            34
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-lg">Clientes</h2>
          <p className="text-4xl text-red-500 font-bold">
            18
          </p>
        </div>

      </div>

      <div className="bg-zinc-900 rounded-xl p-6 mb-8">

        <h2 className="text-3xl font-bold mb-4">
          Productos Más Vendidos
        </h2>

        <ol className="space-y-2">

          <li>🥇 Creatina Monohidratada</li>
          <li>🥈 Proteína Whey</li>
          <li>🥉 Polera Oversize</li>

        </ol>

      </div>

      <div className="bg-zinc-900 rounded-xl p-6">

        <h2 className="text-3xl font-bold mb-4">
          Mejores Clientes
        </h2>

        <table className="w-full">

          <thead>
            <tr className="border-b border-zinc-700">
              <th className="text-left p-3">Cliente</th>
              <th className="text-left p-3">Compras</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td className="p-3">Christopher Méndez</td>
              <td className="p-3">$350.000</td>
            </tr>

            <tr>
              <td className="p-3">Juan Pérez</td>
              <td className="p-3">$180.000</td>
            </tr>

          </tbody>

        </table>

      </div>

    </main>
  );
}