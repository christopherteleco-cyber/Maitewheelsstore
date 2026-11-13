import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    // Correo para el cliente
    await resend.emails.send({
      from: "JK Store <onboarding@resend.dev>",
      to: ["maitewheels.store@gmail.com"],
      subject: "Confirmación de pedido",
      html: `
        <h1>✅ Gracias por tu compra</h1>
        <p>Tu pedido fue recibido correctamente.</p>
      `,
    });

    // Correo para la tienda
    await resend.emails.send({
      from: "JK Store <onboarding@resend.dev>",
      to: ["maitewheels.store@gmail.com"],
      subject: "Nuevo pedido recibido",
      html: `
        <h1>📦 Nuevo pedido</h1>
        <p>Se registró un nuevo pedido en JK Store.</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Correos enviados",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error enviando correos",
      },
      { status: 500 }
    );
  }
}