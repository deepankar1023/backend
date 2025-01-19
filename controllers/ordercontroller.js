const admin = require('firebase-admin');

const completeOrder = async (req, res) => {
  const { token, message } = req.body;

  const payload = {
    notification: {
      title: message.title,
      body: message.body,
    },
    token: token  
  };

  try {
    await admin.messaging().send(payload);
    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending notification', error });
  }
};

module.exports = {completeOrder};
