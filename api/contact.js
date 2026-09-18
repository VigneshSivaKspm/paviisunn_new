import { sendContactEmail } from '../server/mailer.js';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed. Please use POST.' });
  }

  try {
    const { name, email, phone, subject, message } = req.body || {};

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Please provide your full name.' });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'Invalid email address format.' });
    }

    if (!subject || !subject.trim()) {
      return res.status(400).json({ success: false, error: 'Please provide a subject.' });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Please enter your message.' });
    }

    const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '';

    const mailResult = await sendContactEmail(
      {
        name: name.trim(),
        email: email.trim(),
        phone: (phone || '').trim(),
        subject: subject.trim(),
        message: message.trim(),
      },
      clientIp
    );

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      refId: mailResult.refId,
      previewUrl: mailResult.previewUrl || undefined,
    });
  } catch (err) {
    console.error('[Vercel API /api/contact Error]:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to send email via Nodemailer: ' + (err.message || 'Server Error'),
    });
  }
}
