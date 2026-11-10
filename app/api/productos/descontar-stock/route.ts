import { sql } from "@/lib/postgres";

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const {
      productos,
    } = body;

    for (const nombre of productos) {

      await sql`

        UPDATE productos

        SET stock = stock - 1

        WHERE nombre = ${nombre}

        AND stock > 0;

      `;

    }

    return Response.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return Response.json(
      {
        error:
          "Error descontando stock",
      },
      {
        status: 500,
      }
    );

  }

}