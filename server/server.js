import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendContactEmail, getTransporter } from './mailer.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON body parsing
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'PaviiSunn Nodemailer API Server',
    timestamp: new Date().toISOString(),
  });
});

// Contact Form Handler Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body || {};

    // Input Validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please provide your full name.',
      });
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address format (e.g., john@example.com).',
      });
    }

    if (!subject || typeof subject !== 'string' || !subject.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a subject for your enquiry.',
      });
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please enter your message or project requirements.',
      });
    }

    if (message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Message must be at least 10 characters long.',
      });
    }

    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';

    // Send Email via Nodemailer module
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
      message: 'Thank you! Your message has been sent successfully. Our team will contact you shortly.',
      refId: mailResult.refId,
      previewUrl: mailResult.previewUrl || undefined,
    });

  } catch (err) {
    console.error('[API Server Error /api/contact]:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to send message. ' + (err.message || 'Server error'),
    });
  }
});

// Start express server
app.listen(PORT, async () => {
  console.log(`=======================================================`);
  console.log(`🚀 PaviiSunn Nodemailer API Server running on port ${PORT}`);
  console.log(`📍 Endpoint: http://localhost:${PORT}/api/contact`);
  console.log(`=======================================================`);
  
  // Verify SMTP Connection on Startup
  await getTransporter();
});
