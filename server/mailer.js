import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

let transporter = null;

/**
 * Initializes and returns a verified Nodemailer transporter instance.
 * Falls back to an Ethereal test account if SMTP credentials are missing.
 */
export async function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST || '';
  const user = process.env.SMTP_USER || '';
  const pass = process.env.SMTP_PASS || '';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  if (host && user && pass) {
    // Custom / Production SMTP configuration
    transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false, // Prevent SSL cert mismatch errors on custom host servers
      },
    });

    try {
      await transporter.verify();
      console.log(`[Nodemailer] Connected successfully to SMTP server: ${host}:${port}`);
    } catch (err) {
      console.error(`[Nodemailer Warning] SMTP verification failed for ${host}:`, err.message);
    }
  } else {
    // Development / Fallback using Ethereal Test Account
    console.log('[Nodemailer] SMTP credentials missing in .env. Initializing Ethereal test account...');
    try {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      console.log(`[Nodemailer] Ethereal test account initialized: ${testAccount.user}`);
      console.log(`[Nodemailer] Test emails will produce Ethereal preview links in console logs.`);
    } catch (err) {
      console.error('[Nodemailer Error] Failed to create Ethereal test account:', err.message);
      // Fallback dummy transport to avoid hard crashes
      transporter = nodemailer.createTransport({
        jsonTransport: true,
      });
    }
  }

  return transporter;
}

/**
 * Generates branded HTML template for admin notification email
 */
export function buildAdminEmailHtml({ name, email, phone, subject, message, refId, submittedAt, ipAddress }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Website Enquiry</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; color: #333; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #e1e8ed; }
    .header { background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); padding: 30px 25px; text-align: center; border-bottom: 4px solid #F59E0B; }
    .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px; }
    .header p { color: #F59E0B; margin: 5px 0 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase; }
    .body-content { padding: 30px 25px; }
    .alert-badge { display: inline-block; background: #FEF3C7; color: #B45309; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 20px; margin-bottom: 20px; }
    .table-details { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
    .table-details th, .table-details td { padding: 12px 14px; text-align: left; border-bottom: 1px solid #E2E8F0; font-size: 14px; }
    .table-details th { width: 30%; color: #64748B; font-weight: 600; background-color: #F8FAFC; }
    .table-details td { color: #0F172A; font-weight: 500; }
    .message-box { background: #F8FAFC; border-left: 4px solid #F59E0B; padding: 16px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; }
    .footer { background: #F1F5F9; padding: 20px 25px; text-align: center; font-size: 12px; color: #64748B; border-top: 1px solid #E2E8F0; }
    .footer strong { color: #0F172A; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>PaviiSunn Solar Energy</h1>
      <p>New Website Contact Form Enquiry</p>
    </div>
    <div class="body-content">
      <div class="alert-badge">Reference ID: ${refId}</div>
      <p style="font-size: 15px; color: #475569; margin-bottom: 20px;">
        A new contact enquiry has been submitted through the PaviiSunn website. Details are listed below:
      </p>

      <table class="table-details">
        <tr>
          <th>Full Name</th>
          <td><strong>${escapeHtml(name)}</strong></td>
        </tr>
        <tr>
          <th>Email Address</th>
          <td><a href="mailto:${escapeHtml(email)}" style="color: #2563EB; text-decoration: none;">${escapeHtml(email)}</a></td>
        </tr>
        <tr>
          <th>Phone Number</th>
          <td><a href="tel:${escapeHtml(phone)}" style="color: #0F172A; font-weight: 600;">${escapeHtml(phone || 'Not provided')}</a></td>
        </tr>
        <tr>
          <th>Subject</th>
          <td>${escapeHtml(subject || 'Solar Installation Enquiry')}</td>
        </tr>
        <tr>
          <th>Submitted At</th>
          <td>${submittedAt}</td>
        </tr>
        ${ipAddress ? `<tr><th>Sender IP</th><td>${ipAddress}</td></tr>` : ''}
      </table>

      <h4 style="margin: 0 0 10px 0; color: #0F172A; font-size: 14px; text-transform: uppercase;">Message Content:</h4>
      <div class="message-box">${escapeHtml(message)}</div>
    </div>
    <div class="footer">
      <p style="margin: 0;">This email was automatically generated by <strong>PaviiSunn Solar Enquiry Portal</strong>.</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Generates user confirmation auto-reply email
 */
export function buildUserConfirmationHtml({ name, refId, subject }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Thank You for Contacting PaviiSunn</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; color: #333; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #e1e8ed; }
    .header { background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); padding: 30px 25px; text-align: center; border-bottom: 4px solid #10B981; }
    .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; }
    .header p { color: #10B981; margin: 5px 0 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase; }
    .body-content { padding: 30px 25px; font-size: 15px; line-height: 1.6; color: #334155; }
    .highlight-box { background: #ECFDF5; border: 1px solid #A7F3D0; padding: 15px; border-radius: 8px; margin: 20px 0; color: #065F46; }
    .contact-card { background: #F8FAFC; padding: 15px; border-radius: 8px; border: 1px solid #E2E8F0; margin-top: 20px; }
    .footer { background: #F1F5F9; padding: 18px 25px; text-align: center; font-size: 12px; color: #64748B; border-top: 1px solid #E2E8F0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>PaviiSunn Energy Solutions</h1>
      <p>Enquiry Received</p>
    </div>
    <div class="body-content">
      <p>Dear <strong>${escapeHtml(name)}</strong>,</p>
      <p>Thank you for reaching out to <strong>PaviiSunn Solar</strong>!</p>
      
      <div class="highlight-box">
        <strong>Reference ID:</strong> ${refId}<br />
        <strong>Subject:</strong> ${escapeHtml(subject || 'Solar Installation Enquiry')}<br />
        Our solar technical advisory team has received your message and will get back to you within 24 business hours.
      </div>

      <p>If you need urgent assistance regarding <strong>PM - Surya Ghar Muft Bijli Yojana</strong> or solar installation consultation, please feel free to call our offices directly:</p>

      <div class="contact-card">
        <strong style="color: #0F172A;">Coimbatore Office:</strong> +91 99441 73412<br />
        <strong style="color: #0F172A;">Sathyamangalam Office:</strong> +91 98946 93682 / +91 96006 76277<br />
        <strong style="color: #0F172A;">Email:</strong> info@paviisunn.in
      </div>
    </div>
    <div class="footer">
      <p style="margin: 0;">&copy; ${new Date().getFullYear()} PaviiSunn Solar Energy. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Sends contact email via Nodemailer
 */
export async function sendContactEmail(formData, reqIp = '') {
  const activeTransporter = await getTransporter();

  const refId = `PS-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
  const submittedAt = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'medium',
    timeZone: 'Asia/Kolkata',
  });

  const targetEmail = process.env.CONTACT_EMAIL_TO || 'info@paviisunn.in';
  const fromSender = process.env.SMTP_FROM || `"PaviiSunn Solar" <${process.env.SMTP_USER || 'no-reply@paviisunn.in'}>`;

  // 1. Send Admin Email
  const adminMailOptions = {
    from: fromSender,
    to: targetEmail,
    replyTo: `"${formData.name}" <${formData.email}>`,
    subject: `[New Solar Enquiry] ${formData.subject || 'Website Contact Form'} - Ref #${refId}`,
    text: `New Enquiry from ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'N/A'}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}\n\nRef: ${refId}`,
    html: buildAdminEmailHtml({
      ...formData,
      refId,
      submittedAt,
      ipAddress: reqIp,
    }),
  };

  const adminInfo = await activeTransporter.sendMail(adminMailOptions);
  console.log(`[Nodemailer] Admin Email Sent! MessageID: ${adminInfo.messageId}`);

  let etherealPreviewUrl = null;
  if (nodemailer.getTestMessageUrl(adminInfo)) {
    etherealPreviewUrl = nodemailer.getTestMessageUrl(adminInfo);
    console.log(`[Nodemailer Ethereal Preview URL]: ${etherealPreviewUrl}`);
  }

  // 2. Send Auto-Reply Confirmation Email to User (best effort, fails silently if user email bounces)
  if (formData.email && process.env.DISABLE_AUTO_REPLY !== 'true') {
    try {
      const userMailOptions = {
        from: fromSender,
        to: formData.email,
        subject: `Thank you for contacting PaviiSunn Solar! [Ref #${refId}]`,
        html: buildUserConfirmationHtml({
          name: formData.name,
          refId,
          subject: formData.subject,
        }),
      };
      await activeTransporter.sendMail(userMailOptions);
      console.log(`[Nodemailer] Auto-reply confirmation sent to: ${formData.email}`);
    } catch (replyErr) {
      console.warn(`[Nodemailer Warning] Could not send auto-reply to ${formData.email}:`, replyErr.message);
    }
  }

  return {
    success: true,
    refId,
    messageId: adminInfo.messageId,
    previewUrl: etherealPreviewUrl,
  };
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
