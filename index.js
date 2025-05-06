// index.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Facebook Webhook Verification Handler
app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = "courierbot"; // <-- Make sure this matches what you set in FB App

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token && mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('🔗 Webhook verified by Facebook');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Dialogflow fulfillment endpoint
app.post('/webhook', (req, res) => {
  console.log("📥 Received request:", JSON.stringify(req.body, null, 2));
  const intent = req.body.queryResult.intent.displayName;

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

  console.log("📤 Responding with:", responseText);
  return res.json({
    fulfillmentText: responseText
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Ermis webhook server running on port ${PORT}`);
});
