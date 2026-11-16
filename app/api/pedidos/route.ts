import { sql } from "@/lib/postgres";
import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function GET() {

  try {

    const pedidos =
      await sql`

        SELECT *
        FROM pedidos
        ORDER BY id DESC;

      `;

    return Response.json(
      pedidos
    );

  } catch (error) {

    console.error(error);

return Response.json(
  {
    error: String(error),
  },
  {
    status: 500,
  }
);

  }

}

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const {
      cliente,
      correo,
      telefono,
      direccion,
      productos,
      total,
      fecha,
    } = body;

    const pedido =
      await sql`

        INSERT INTO pedidos (

          cliente,
          correo,
          telefono,
          direccion,
          productos,
          total,
          fecha

        )

        VALUES (

          ${cliente},
          ${correo},
          ${telefono},
          ${direccion},
          ${JSON.stringify(productos ?? productos)},
          ${total},
          ${fecha}

        )

        RETURNING *;

      `;

      const productosArray = productos as {
  nombre: string;
  cantidad: number;
  precio: number;
}[];

try {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: [
      correo,
      "maitewheels.store@gmail.com"
    ],
    subject: `Pedido #${pedido[0].id} recibido`,
    html: `
<div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; padding: 20px;">

  <h1 style="color:#d32f2f;">
    🚗 Maite Wheels Store
  </h1>

  <h2>Nuevo Pedido #${pedido[0].id}</h2>

  <hr />

  <p><strong>Cliente:</strong> ${cliente}</p>
  <p><strong>Correo:</strong> ${correo}</p>
  <p><strong>Teléfono:</strong> ${telefono}</p>
  <p><strong>Dirección:</strong> ${direccion}</p>

  <hr />

  <h3>Productos</h3>

  <table
    width="100%"
    cellpadding="10"
    cellspacing="0"
    border="1"
    style="border-collapse: collapse;"
  >
    <tr style="background:#f5f5f5;">
      <th>Producto</th>
      <th>Cantidad</th>
      <th>Precio</th>
    </tr>

    ${productosArray
      .map(
  (p: {
  nombre: string;
  cantidad: number;
  precio: number;
}) => `

    <tr>
      <td>${p.nombre}</td>
      <td>${p.cantidad}</td>
      <td>$${p.precio}</td>
    </tr>
  `
)
      .join("")}
  </table>

  <h2 style="margin-top:20px;color:#2e7d32;">
    Total: $${total}
  </h2>

  <hr />

  <p>
    Pedido generado correctamente en Maite Wheels Store.
  </p>

</div>
`,
  });
} catch (emailError) {
  console.error(
    "Error enviando correo:",
    emailError
  );
}

    return Response.json(
      pedido[0]
    );

  } catch (error) {

    console.error(error);

    return Response.json(
      {
        error:
          "Error creando pedido",
      },
      {
        status: 500,
      }
    );

  }

}

export async function PUT(
  request: Request
) {

  try {

    const body =
      await request.json();

    const {
      id,
      estado,
    } = body;

    const pedido =
      await sql`

        UPDATE pedidos

        SET estado = ${estado}

        WHERE id = ${id}

        RETURNING *;

      `;


    return Response.json(
      pedido[0]
    );

  } catch (error) {

    console.error(error);

    return Response.json(
      {
        error:
          "Error actualizando pedido",
      },
      {
        status: 500,
      }
    );

  }

}