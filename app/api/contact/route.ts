import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, projectType, message } = await req.json();

    // Basic validation
    if (!name || !email || !projectType || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email sent TO you (the portfolio owner)
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[Portfolio] New message from ${name} — ${projectType}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 32px 36px;">
            <h1 style="margin: 0; color: #fff; font-size: 22px; font-weight: 700; letter-spacing: -0.3px;">
              📬 New Portfolio Message
            </h1>
            <p style="margin: 6px 0 0; color: rgba(255,255,255,0.75); font-size: 13px;">
              Someone reached out via your portfolio contact form
            </p>
          </div>

          <!-- Body -->
          <div style="padding: 32px 36px; background: #fff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                  <span style="font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.8px;">Name</span><br/>
                  <span style="font-size: 15px; color: #1e293b; font-weight: 500; margin-top: 4px; display: block;">${name}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                  <span style="font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.8px;">Email</span><br/>
                  <a href="mailto:${email}" style="font-size: 15px; color: #6366f1; font-weight: 500; margin-top: 4px; display: block; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                  <span style="font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.8px;">Project Type</span><br/>
                  <span style="display: inline-block; margin-top: 6px; padding: 4px 12px; background: #ede9fe; color: #7c3aed; border-radius: 20px; font-size: 13px; font-weight: 600;">${projectType}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0;">
                  <span style="font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.8px;">Message</span><br/>
                  <p style="font-size: 15px; color: #334155; line-height: 1.7; margin: 8px 0 0; white-space: pre-wrap;">${message}</p>
                </td>
              </tr>
            </table>

            <div style="margin-top: 28px; padding: 16px; background: #f0fdf4; border-radius: 10px; border-left: 4px solid #10b981;">
              <p style="margin: 0; font-size: 13px; color: #15803d;">
                💡 <strong>Quick reply:</strong> Just hit Reply on this email — it goes directly to <strong>${email}</strong>
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div style="padding: 20px 36px; background: #f8fafc; text-align: center;">
            <p style="margin: 0; font-size: 12px; color: #94a3b8;">
              Sent from your portfolio at himanshuchauhan.dev &nbsp;•&nbsp; ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
            </p>
          </div>
        </div>
      `,
    });

    // Auto-reply to the sender
    await transporter.sendMail({
      from: `"Himanshu Chauhan" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Thanks for reaching out, ${name}! 👋`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 32px 36px;">
            <h1 style="margin: 0; color: #fff; font-size: 22px; font-weight: 700;">
              Hey ${name}! 👋
            </h1>
            <p style="margin: 6px 0 0; color: rgba(255,255,255,0.8); font-size: 13px;">
              Thanks for getting in touch
            </p>
          </div>
          <div style="padding: 32px 36px; background: #fff;">
            <p style="font-size: 15px; color: #334155; line-height: 1.7; margin: 0 0 16px;">
              I've received your message and I'll get back to you within <strong>24–48 hours</strong>. I'm looking forward to learning more about your <strong>${projectType}</strong> project!
            </p>
            <p style="font-size: 15px; color: #334155; line-height: 1.7; margin: 0;">
              In the meantime, feel free to check out my GitHub or LinkedIn.
            </p>
            <div style="margin-top: 28px; display: flex; gap: 12px;">
              <a href="https://github.com/Himanshuch01" style="display: inline-block; padding: 10px 20px; background: #1e293b; color: #fff; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600;">GitHub</a>
              <a href="https://linkedin.com/in/chimanshu" style="display: inline-block; padding: 10px 20px; background: #0A66C2; color: #fff; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600;">LinkedIn</a>
            </div>
          </div>
          <div style="padding: 20px 36px; background: #f8fafc; text-align: center;">
            <p style="margin: 0; font-size: 12px; color: #94a3b8;">
              Himanshu Chauhan · Full-Stack Engineer · himanshuch.dev@gmail.com
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
