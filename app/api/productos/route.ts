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