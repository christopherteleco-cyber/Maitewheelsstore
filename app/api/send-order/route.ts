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

    const resultado = await resend.emails.send({
  from: "MaiteWheels Store <onboarding@resend.dev>",
  to: ["maitewheels.store@gmail.com", 
      correo],
      subject: "Confirmación de pedido - Maite Wheels Store",
      html: `
  <h2>✅ Pedido recibido correctamente</h2>

  <p><strong>Cliente:</strong> ${cliente}</p>
  <p><strong>Correo:</strong> ${correo}</p>
  <p><strong>Teléfono:</strong> ${telefono}</p>
  <p><strong>Dirección:</strong> ${direccion}</p>

  

<h3>Productos comprados</h3>

<p>
  Hemos recibido tu pedido correctamente.
</p>

<p>
  Te contactaremos para coordinar la entrega.
</p>

<p>
  Gracias por preferir
  <strong>Maite Wheels Store</strong>.
</p>

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

<p>
  Gracias por comprar en
  <strong>Maite Wheels Store</strong>.
</p>
`,
    });

    console.log("Correo enviado:", resultado);

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