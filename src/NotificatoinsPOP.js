import { subscribeUser } from './utils/pushNotifications';
import { useState } from 'react';

const BACKEND_URL = 'https://clinic-manager-backend-57h8.onrender.com'; // your backend URL
const VAPID_PUBLIC_KEY = 'BLGOPLxnw-ON98vDhXWJz-yN0p97WFeSdwlWTSJ3BAmuBNpOw0U-v721GKmI4KFplRb0SPNd4trXMeWo5Frr9Mo';

function NotificationButton() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async () => {
    try {
      await subscribeUser(BACKEND_URL, VAPID_PUBLIC_KEY);
      setIsSubscribed(true);
      alert('Notifications enabled!');
    } catch (err) {
      console.error(err);
      alert('Failed to enable notifications');
    }
  };

  if (isSubscribed) {
    return <span>✅ Notifications are on</span>;
  }

  return <button onClick={handleSubscribe}>🔔 Enable Reminders</button>;
}
export default NotificationButton;