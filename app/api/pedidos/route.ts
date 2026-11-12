import { sql } from "@/lib/postgres";

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