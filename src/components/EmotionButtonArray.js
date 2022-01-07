import { allEmotions, emotionsNumMap, emotionsMap } from "./misc/content"
import JSConfetti from "js-confetti"
import { useState } from "react"
import { useNavigate } from "react-router";
import db from "../config";
import CircularProgress from '@mui/material/CircularProgress';

const EmotionButtonArray =()=>{
    let navigate = useNavigate()
    const confetti = new JSConfetti()
    const [feelSent, setFeelSent] = useState(false)
    const writeFeelingToFB =(feeling)=>{
        if(!feelSent){
            let writeObj={
                emotion:emotionsNumMap[feeling],
                timestamp:new Date()
            }
            db.collection("emotions").add(writeObj).then(()=>{
                setFeelSent(true)
                navigate(`/${feeling}`)
            }).catch((error)=>{
                console.error(error)
            })
    }}
    return (
        <>{
            feelSent?
            (
            <div className={"centerContent loadingBoxCircular"}>
                <CircularProgress
                    style={{
                        color:"#5959ff"
                    }}
                />
            </div>
            )
            :(<div>
                {
                    allEmotions.map((item, key)=>{
                        return(
                        <div key={key}>
                            <button 
                            className={"emotionSelectButton"} 
                            key={key}
                            onClick={()=>{
                                confetti.addConfetti({
                                    emojis:[emotionsMap[item]]
                                })
                                writeFeelingToFB(item)
                            }}
                            >
                            <h3>&nbsp;{emotionsMap[item]}&nbsp;&nbsp;&nbsp;{item}</h3>
                            </button>
                        </div>
                        )
                    })
                }
            </div>)
}</>
    )
}
export default EmotionButtonArray