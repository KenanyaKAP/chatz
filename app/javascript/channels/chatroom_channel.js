import consumer from "./consumer";

/**
 * Subscribe to a chatroom channel
 * @param {string} chatroomId - The ID of the chatroom to subscribe to
 * @param {string} userId - The current user's ID
 * @param {function} onReceived - Callback function when a message is received
 * @returns {object} - The subscription object
 */
export const subscribeToChatroom = (chatroomId, userId, onReceived) => {
  return consumer.subscriptions.create(
    {
      channel: "ChatroomChannel",
      chatroom_id: chatroomId,
      user_id: userId,
    },
    {
      connected() {
        console.log(`Connected to chatroom ${chatroomId}`);
      },

      disconnected() {
        console.log(`Disconnected from chatroom ${chatroomId}`);
      },

      received(data) {
        console.log("Received data:", data);
        if (onReceived) {
          onReceived(data);
        }
      },
    }
  );
};

/**
 * Unsubscribe from a chatroom channel
 * @param {object} subscription - The subscription object to unsubscribe
 */
export const unsubscribeFromChatroom = (subscription) => {
  if (subscription) {
    subscription.unsubscribe();
    console.log("Unsubscribed from chatroom");
  }
};
