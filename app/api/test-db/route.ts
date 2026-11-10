import { sql } from "@/lib/db";

export async function GET() {

  try {

    const result =
      await sql`SELECT version()`;

    return Response.json({
      success: true,
      result,
    });

  } catch (error) {

    console.error(
      "ERROR COMPLETO:",
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