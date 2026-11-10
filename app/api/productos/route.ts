import { sql } from "@/lib/postgres";

export async function GET() {

  try {

    const productos =
      await sql`
        SELECT *
        FROM productos
        ORDER BY id;
      `;

    return Response.json(
      productos
    );

  } catch (error) {

    console.error(
      error
    );

    return Response.json(
      {
        error:
          "Error obteniendo productos",
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
      precio,
      stock,
      categoria,
      imagen,
    } = body;

    const producto =
      await sql`

        INSERT INTO productos (

          nombre,
          precio,
          stock,
          categoria,
          imagen

        )

        VALUES (

          ${nombre},
          ${precio},
          ${stock},
          ${categoria},
          ${imagen}

        )

        RETURNING *;

      `;

    return Response.json(
      producto[0]
    );

  } catch (error) {

    console.error(error);

    return Response.json(
      {
        error:
          "Error creando producto",
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
      nombre,
      precio,
      stock,
      categoria,
      imagen,
    } = body;

    const producto =
      await sql`

        UPDATE productos

        SET

          nombre = ${nombre},
          precio = ${precio},
          stock = ${stock},
          categoria = ${categoria},
          imagen = ${imagen}

        WHERE id = ${id}

        RETURNING *;

      `;

    return Response.json(
      producto[0]
    );

  } catch (error) {

    console.error(error);

    return Response.json(
      {
        error:
          "Error actualizando producto",
      },
      {
        status: 500,
      }
    );

  }

}

export async function DELETE(
  request: Request
) {

  try {

    const body =
      await request.json();

    const { id } = body;

    await sql`

      DELETE FROM productos

      WHERE id = ${id};

    `;

    return Response.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return Response.json(
      {
        error:
          "Error eliminando producto",
      },
      {
        status: 500,
      }
    );

  }

}