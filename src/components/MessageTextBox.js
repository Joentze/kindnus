import db from "../config";
import { useState } from "react";
import { Tooltip, Button } from "@mui/material";
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
        <div>
        </div>
        <div>
            <textarea id={"textAreaInput"}></textarea>
        </div>
        <div>
            <Button 
            variant="contained"
            size="large"
            style={{
                background:"#5959FF",
                fontStyle:"Bold"
            }}
            onClick={()=>{
                writeMessageToFB()
            }}
            ></Button>
        </div>
        </>
    )
}
export default InputForm