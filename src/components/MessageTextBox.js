import db from "../config";
import { useState } from "react";
import { Tooltip, IconButton, Button } from "@mui/material";
import { allEmotions, emotionsNumMap, emotionsMap } from "./misc/content";
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
            {
                emo?(
                    <></>
                ):(
                    allEmotions.map((item, key)=>{
                        return (
                            <Tooltip title={item} key={key}>
                                <IconButton
                                component="span"
                                color="primary"
                                style={{
                                    width:"50px",
                                    margin:"5px"
                                }}
                                onClick={()=>{
                                    setEmo(emotionsNumMap[item])
                                    setEmoSelcted(true)
                                }}
                                >
                                    {emotionsMap[item]}
                                </IconButton>
                            </Tooltip>
                        )
                    })
                )
            }
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
            >
            Send ✈️
            </Button>
        </div>
        </>
    )
}
export default InputForm