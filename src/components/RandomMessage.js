/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react";
import db from "../config";

const RandomMessage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [randomMessage, setRandomMessage] = useState('');

  const fetchMessages = async () => {
    setIsLoading(true);

    const messagesRef = db.collection("messages");

    let queryRef;

    try {

      // if null, choose a random message from the latest 2 messages
      if (props.emotion != null && props.emotion != undefined) {
        queryRef = messagesRef
          .where("emotion", "==", props.emotion)
          .orderBy("timestamp", "desc")
          .limit(2);
      } else {
        queryRef = messagesRef
          .orderBy("timestamp", "desc")
          .limit(2);
      }
      const data = await queryRef.get();

      const messages = [];

      data.docs.forEach((message) => {
        messages.push(message.data()['message']);
      });

      console.log(messages)
      setRandomMessage(messages[Math.floor(Math.random() * messages.length)]);
      setIsLoading(false);


    } catch (e) {
      setRandomMessage("Error loading a message")
      setIsLoading(false);
      console.log(e)
    }




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
    <section>
      <h3>Random Messages</h3>
      <p>Done</p>
      <blockquote>{randomMessage}</blockquote>
    </section>
  );
};

export default RandomMessage;
