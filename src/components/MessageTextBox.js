import db from "../config";
import { useState } from "react";

const InputForm =()=>{
    const [emo, setEmo] = useState(null);
    const [emoSelected, setEmoSelcted] = useState(false);
    const [messageStatus, setMessageStatus] = useState(false);
    const writeMessageToFB =()=>{
        if(!messageStatus && emoSelected){
            let writeObj ={
                message:document.getElementById('textAreaInput').value,
                emotion:emo,
                timestamp:new Date()
            }
            db.collection("messages").add(writeObj).then(
                //sets message status to prevent spam
                ()=>{
                    setMessageStatus(true)
                }).catch((error)=>{
                //prints error message
                    console.error(error)
                })
            }
    }
    return(
        <>
        <textarea id={"textAreaInput"}>

        </textarea>
        </>
    )
}
export default InputForm