/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react";
import db from "../config";

const RandomMessage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [randomMessage, setRandomMessage] = useState([]);

  const fetchMessages = async () => {
    setIsLoading(true);
    const messagesRef = db.collection("messages");
    const queryRef = messagesRef
      .where("emotion", "==", props.emotion)
      .orderBy("timestamp", "desc")
      .limit(10);
    const data = await queryRef.get();

    const messages = [];
    data.docs.forEach((message) => {
      messages.push(message.data());
    });

    setRandomMessage(messages[Math.floor(Math.random() * messages.length)]);
    setIsLoading(false);
  };

  useEffect(async () => {
    await fetchMessages();
  }, []);
  if (isLoading) {
    return (
      <section>
        <p>Loading message...</p>
      </section>
    );
  }

  return (
    <>
      <p style={{ color: "#5959ff" }}>{randomMessage.message}</p>
    </>
  );
};

export default RandomMessage;
