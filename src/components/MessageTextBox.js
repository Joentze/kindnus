import db from "../config";
import { useState } from "react";
import { Tooltip, IconButton, Button } from "@mui/material";
import { allEmotions, emotionsNumMap, emotionsMap } from "./misc/content";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';
const InputForm =()=>{
    const [emo, setEmo] = useState(null);
    const [emoSelected, setEmoSelected] = useState(false);
    const [messageStatus, setMessageStatus] = useState(false);
    const writeMessageToFB =()=>{
        if(!messageStatus && emoSelected){
            let writeObj ={
                message:document.getElementById('textAreaInput').value,
                emotion:emotionsNumMap[emo],
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
        {
        messageStatus?(
            <div>
                <CircularProgress
                    style={{
                        color:"#5959ff"
                    }}
                />
            </div>
        ):
        (
        <div>
        <div>
            {
                emo?(
                    <div>
                        <div>
                            <IconButton
                            onClick={()=>{
                                setEmo(null)
                                setEmoSelected(false)
                            }}
                            >
                                <ArrowBackIosIcon></ArrowBackIosIcon>
                            </IconButton>
                        </div>
                        <div>
                            <h2>{emo} {emotionsMap[emo]}</h2>
                        </div>
                    </div>
                ):(<div>
                    {allEmotions.map((item, key)=>{
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
                                    setEmo(item)
                                    setEmoSelected(true)
                                }}
                                >
                                    {emotionsMap[item]}
                                </IconButton>
                            </Tooltip>
                        )
                    })}
                    </div>
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
        </div>)}
        </>
    )
}
export default InputForm