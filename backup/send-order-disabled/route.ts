import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(
  request: Request
) {

  try {

    const body = await request.json();

    const {
      cliente,
      correo,
      telefono,
      direccion,
      productos,
      total,
    } = body;

    const data = await resend.emails.send({

      from:
        "onboarding@resend.dev",

      to:
        "maitewheels.store@gmail.com",

      subject:
        `Nuevo pedido de ${cliente}`,

      html: `
        <h2>Nuevo Pedido MaiteWheels</h2>

        <p><strong>Cliente:</strong> ${cliente}</p>

        <p><strong>Correo:</strong> ${correo}</p>

        <p><strong>Teléfono:</strong> ${telefono}</p>

        <p><strong>Dirección:</strong> ${direccion}</p>

        <p><strong>Productos:</strong></p>

        <ul>
          ${productos
            .map(
              (p: string) =>
                `<li>${p}</li>`
            )
            .join("")}
        </ul>

        <p>
          <strong>Total:</strong>
          $${total}
        </p>
      `,
    });

    console.log(
  "RESEND RESPONSE:",
  data
);

    return Response.json({
      success: true,
      data,
    });

  } catch (error) {

  console.error(
    "ERROR RESEND:",
    error
  );

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