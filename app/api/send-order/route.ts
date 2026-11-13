import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const {
      cliente,
      correo,
      telefono,
      direccion,
      productos,
      total,
    } = await req.json();

    // Correo al cliente
    await resend.emails.send({
      from: "JK Store <onboarding@resend.dev>",
      to: [correo],
      subject: "Confirmación de pedido - JK Store",
      html: `
        <h1>✅ Gracias por tu compra</h1>

        <p>Hola ${cliente}, hemos recibido tu pedido.</p>

        <p><strong>Total:</strong> $${total}</p>

        <p>Nos pondremos en contacto contigo pronto.</p>
      `,
    });

    // Correo a la tienda
    await resend.emails.send({
      from: "JK Store <onboarding@resend.dev>",
      to: ["maitewheels.store@gmail.com"],
      subject: "Nuevo pedido recibido",
      html: `
        <h2>📦 Nuevo pedido</h2>

        <p><strong>Cliente:</strong> ${cliente}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Dirección:</strong> ${direccion}</p>
        <p><strong>Total:</strong> $${total}</p>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}