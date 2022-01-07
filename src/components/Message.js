/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import db from "../config";

const Message = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMessages, setLoadedMessages] = useState([]);

  const fetchMessages = async () => {
    setIsLoading(true);
    const response = db.collection("messages");
    const data = await response.get();

    const messages = [];
    data.docs.forEach((message) => {
      messages.push(message.data());
    });
    setLoadedMessages(messages);
    setIsLoading(false);
  };
  useEffect(async () => {
    await fetchMessages();
  }, []);
  if (isLoading) {
    return (
      <section>
        <h1>All Messages</h1>
        <p>Loading...</p>
      </section>
    );
  }
  return (
    <section>
      <h1>All Messages</h1>
      <p>Done</p>
      <ul>
        {loadedMessages.map((loadedMessage) => (
          <li key={loadedMessage.message}>{loadedMessage.message}</li>
        ))}
      </ul>
    </section>
  );
};

export default Message;
