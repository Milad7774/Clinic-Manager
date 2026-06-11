const express = require('express');
const webpush = require('web-push');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Paste your VAPID keys here
const vapidKeys = {
  publicKey: 'BLGOPLxnw-ON98vDhXWJz-yN0p97WFeSdwlWTSJ3BAmuBNpOw0U-v721GKmI4KFplRb0SPNd4trXMeWo5Frr9Mo',
  privateKey: 'AWy5PVm-Twhs_LGGhvtaal2IH2Ilie64fBI81tzNVtE'
};

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// In‑memory store (use a real database in production)
const subscriptions = new Map();

// Endpoint to save a subscription from the frontend
app.post('/api/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.set(subscription.endpoint, subscription);
  res.json({ success: true });
});

// Endpoint to remove an expired subscription
app.post('/api/unsubscribe', (req, res) => {
  const { endpoint } = req.body;
  subscriptions.delete(endpoint);
  res.json({ success: true });
});

// Endpoint to send a notification (you'd call this from a cron job or after adding an appointment)
app.post('/api/send-reminder', async (req, res) => {
  const { title, body, url } = req.body;

  const payload = JSON.stringify({ title, body, url });

  const results = [];
  for (const subscription of subscriptions.values()) {
    try {
      await webpush.sendNotification(subscription, payload);
      results.push({ success: true });
    } catch (err) {
      if (err.statusCode === 410) {
        // Subscription expired – remove it
        subscriptions.delete(subscription.endpoint);
      }
      results.push({ success: false, error: err.message });
    }
  }

  res.json({ results });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));