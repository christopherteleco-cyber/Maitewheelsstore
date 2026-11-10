import { sql } from "@/lib/postgres";

export async function GET() {

  try {

    const clientes =
      await sql`

        SELECT *
        FROM clientes
        ORDER BY id DESC;

      `;

    return Response.json(
      clientes
    );

  } catch (error) {

    console.error(error);

    return Response.json(
      {
        error:
          "Error obteniendo clientes",
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
      nombre,
      correo,
      telefono,
      direccion,
    } = body;

    const cliente =
      await sql`

        INSERT INTO clientes (

          nombre,
          correo,
          telefono,
          direccion

        )

        VALUES (

          ${nombre},
          ${correo},
          ${telefono},
          ${direccion}

        )

        RETURNING *;

      `;

    return Response.json(
      cliente[0]
    );

  } catch (error) {

    console.error(error);

    return Response.json(
      {
        error:
          "Error creando cliente",
      },
      {
        status: 500,
      }
    );

  }

}