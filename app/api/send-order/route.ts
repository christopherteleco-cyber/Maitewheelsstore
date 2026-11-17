import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
const {
  pedidoId,
  cliente,
  correo,
  telefono,
  direccion,
  productos,
  total,
} = await req.json();

const numeroPedido =
  `MW-${String(
    pedidoId
  ).padStart(6, "0")}`;

  console.log(
  "pedidoId:",
  pedidoId
);

console.log(
  "numeroPedido:",
  numeroPedido
);

    // 1. Correo para el CLIENTE
    const resultadoCliente = await resend.emails.send({
      from: "MaiteWheels Store <onboarding@resend.dev>",
      to: correo,
      subject: "Confirmación de tu pedido - Maite Wheels Store",
      html: `
  <h2>✅ ¡Gracias por tu compra, ${cliente}!</h2>

  <p>
  <strong>Número de pedido:</strong>
  ${numeroPedido}
</p>

  <p>Hemos recibido tu pedido correctamente y ya lo estamos preparando.</p>

  <h3>Resumen de tu pedido</h3>

  <ul>
    ${productos
      .map(
        (p: string) => `<li>${p}</li>`
      )
      .join("")}
  </ul>

  <p><strong>Dirección de entrega:</strong> ${direccion}</p>

  <hr />

  <h2 style="color:#2e7d32;">
    Total: $${total}
  </h2>

  <p>
    Gracias por comprar en
    <strong>Maite Wheels Store</strong>.
  </p>
`,
    });

    // 2. Correo interno para TI (la tienda)
    const resultadoTienda = await resend.emails.send({
      from: "MaiteWheels Store <onboarding@resend.dev>",
      to: "maitewheels.store@gmail.com",
      replyTo: correo,
      subject: `Nuevo pedido de ${cliente} - Maite Wheels Store`,
      html: `
  <h2>🛒 Nuevo pedido recibido</h2>

  <p>
  <strong>Pedido:</strong>
  ${numeroPedido}
</p>

  <p><strong>Cliente:</strong> ${cliente}</p>
  <p><strong>Correo:</strong> ${correo}</p>
  <p><strong>Teléfono:</strong> ${telefono}</p>
  <p><strong>Dirección:</strong> ${direccion}</p>

  <h3>Productos comprados</h3>

  <ul>
    ${productos
      .map(
        (p: string) => `<li>${p}</li>`
      )
      .join("")}
  </ul>

  <hr />

  <h2 style="color:#2e7d32;">
    Total: $${total}
  </h2>
`,
    });

    console.log("Correo cliente:", resultadoCliente);
    console.log("Correo tienda:", resultadoTienda);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("ERROR SEND-ORDER:", error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}