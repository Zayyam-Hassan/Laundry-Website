const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sendEmail = require('./Routes/SMTP');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Email sending route
app.post('/api/send-email', async (req, res) => {
  const { subject, text, html } = req.body;

  try {
    const result = await sendEmail(subject, text, html);   // ✅ Don't pass 'to'
    res.status(200).json({
      success: true,
      messageId: result.messageId,
    });
  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
