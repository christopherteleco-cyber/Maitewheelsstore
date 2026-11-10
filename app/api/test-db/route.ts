import { sql } from "@/lib/postgres";

export async function GET() {

  try {

    const result =
      await sql`
        SELECT NOW() as fecha
      `;

    return Response.json({
      success: true,
      result,
    });

  } catch (error) {

    console.error(
      "POSTGRES ERROR:",
      error
    );

    return Response.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );

  }

}