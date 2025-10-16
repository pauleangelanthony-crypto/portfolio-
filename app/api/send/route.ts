import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, from, subject, message, name } = body;

    // configure transporter - use env vars in production
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER || to,
        pass: process.env.EMAIL_PASS || "",
      },
    });
    // Do NOT log secrets in production; shown here for local debug only

    const mailOptions = {
      from: from || process.env.EMAIL_USER,
      to,
      subject: subject || `Message from ${name || "website"}`,
      text: message,
      html: `<div><strong>${name || ""}</strong></div><div>${
        message || ""
      }</div>`,
    };

    // verify connection config first for clearer errors
    try {
      const v = await transporter.verify();
    } catch (verifyErr: any) {
      console.error("transporter verify error", verifyErr);
      throw verifyErr;
    }

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return new NextResponse(err?.message || "error", { status: 500 });
  }
}
