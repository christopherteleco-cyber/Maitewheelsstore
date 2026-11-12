import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST() {

  return Response.json({
    success: true,
    message: "Resend configurado",
  });

}
