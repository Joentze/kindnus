import InputForm from "../components/MessageTextBox"
import MainBackground from '../components/MainBackground'
import RandomMessageHome from "../components/RandomMessageHome"
import { useState, useEffect } from "react";
import db from "../config";

const SendMessage = () => {

    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {


        const messagesRef = db.collection("messages");
        try {
            const queryRef = messagesRef
                .orderBy("timestamp", "desc")
                .limit(5);
            const data = await queryRef.get();

            data.docs.forEach((doc) => {

                const emotion = doc.data()['emotion']
                let emoji = "";
                switch (emotion) {
                    case 0:
                        emoji = "😊";
                        break;
                    case 1:
                        emoji = "😢";
                        break;
                    case 2:
                        emoji = "😡";
                        break;
                    case 3:
                        emoji = "😍";
                        break;
                }

                setMessages((oldValue) => [...oldValue, doc.data()['message'] + ' ' + emoji]);
            });

            console.log(messages)

            //messages[Math.floor(Math.random() * messages.length)]
        } catch (e) {
            setMessages("Error loading a message")
            console.log(e)
        }

    };

    useEffect(async () => {
        setMessages([])
        await fetchMessages();
    }, []);


    return (
        <>
            <MainBackground />
            <div className="sendMessageWrapper">
                <div className={"headerTitlePage"}>
                    <h1>Send a Message</h1>
                    <p>to Someone Feeling...</p>
                </div>
                <InputForm />
                <div className="homeRandomMessages">

                    {
                        messages.map((message, index) => {

                            return (<div className={`randomMessagePositioner${index}`} key={index}> <RandomMessageHome message={message} /> </div>)

                        })
                    }
                </div>

            </div>

        </>
    )
}
export default SendMessage