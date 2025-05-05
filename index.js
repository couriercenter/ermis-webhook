// index.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());

// Webhook route
app.post('/webhook', (req, res) => {
  const intent = req.body.queryResult?.intent?.displayName || '';

  let responseText = '';
  switch (intent) {
    case 'Track Package':
      responseText = 'Please provide your tracking number.';
      break;
    case 'Store Hours':
      responseText = 'Our stores operate Monday to Friday, 09:00 to 17:00.';
      break;
    default:
      responseText = "I'm sorry, I didn't understand that. Could you rephrase?";
  }

  return res.json({
    fulfillmentText: responseText
  });
});

// Start the server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Ermis webhook server running on port ${PORT}`);
});
