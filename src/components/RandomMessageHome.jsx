/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react";
import db from "../config";

const RandomMessage = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [randomMessage, setRandomMessage] = useState('');

    // const fetchMessages = async () => {
    //     setIsLoading(true);

    //     const messagesRef = db.collection("messages");



    //     try {

    //         const queryRef = messagesRef
    //             .orderBy("timestamp", "desc")
    //             .limit(2);
    //         const data = await queryRef.get();

    //         const messages = [];

    //         data.docs.forEach((message) => {
    //             messages.push(message.data()['message']);
    //         });

    //         console.log(messages)
    //         setRandomMessage(messages[Math.floor(Math.random() * messages.length)]);
    //         setIsLoading(false);


    //     } catch (e) {
    //         setRandomMessage("Error loading a message")
    //         setIsLoading(false);
    //         console.log(e)
    //     }




    // };

    // useEffect(async () => {
    //     await fetchMessages();
    // }, []);

    useEffect(() => {

        if (props.message != null && props.message != undefined) {
            setIsLoading(false)
        }
    }, [])
    if (isLoading) {
        return (
            <section>
                <p>Loading message...</p>
            </section>
        );
    }


    return (
        <section className="homeRandomMessage">
            <p> {props.message} </p>
            <blockquote > {randomMessage} </blockquote>
        </section>
    );
};

export default RandomMessage;
