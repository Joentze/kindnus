<<<<<<< HEAD
import { Divider } from "@mui/material"
import { allEmotions } from "./misc/content"
import Chip from '@mui/material/Chip';
const MoodContainer =({content, mood})=>{
    const definition = content['definition']
    const synonyms = content['synonyms']
    return (
        <div className={"centerContent moodDescriptionContainer"}>
            <h1>{allEmotions[mood]}</h1>
            {synonyms.map((item, key)=>{
                return (<Chip 
                    key={key} 
                    label={item} 
                    style={{
                        margin:'5px', 
                        fontFamily:'Nunito',
                        background:'#ffdfbd',
                        color:'#bf8649',
                    }} 
                    size="small"
                    />)
            })} 
            <br></br>
            <br></br>
            <Divider/>
            <p>{definition}</p>
        </div>
    )
}
export default MoodContainer
=======
import { Divider, Button, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import { allEmotions } from "./misc/content";
import Chip from "@mui/material/Chip";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import CasinoIcon from "@mui/icons-material/Casino";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import RandomMessage from "./RandomMessage";

const MoodContainer = ({ content, mood }) => {
  const definition = content["definition"];
  const synonyms = content["synonyms"];
  const [isMsg, setMsgMode] = useState(false);
  const [messageKey, setMessageKey] = useState(false);
  return (
    <div className={"centerContent moodDescriptionContainer"}>
      {isMsg ? (
        <>
          <h1>Messages</h1>
          <Divider />
          {messageKey && <RandomMessage emotion={mood} key={messageKey} />}
          <div className={"messageBottomButtonSet centerContent"}>
            <Tooltip title={"See Content"}>
              <IconButton
                style={{
                  position: "absolute",
                  bottom: "0px",
                  left: "0px",
                  margin: "20px",
                  color: "#7867c5",
                }}
                onClick={() => {
                  setMsgMode(false);
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Get Another Message"}>
              <IconButton
                style={{
                  position: "absolute",
                  bottom: "0px",
                  right: "0px",
                  margin: "20px",
                  color: "#7867c5",
                }}
                onClick={() => setMessageKey(Math.random())}
              >
                <CasinoIcon />
              </IconButton>
            </Tooltip>
          </div>
        </>
      ) : (
        <>
          <h1>{allEmotions[mood]}</h1>
          {synonyms.map((item, key) => {
            return (
              <Chip
                key={key}
                label={item}
                style={{
                  margin: "5px",
                  fontFamily: "Nunito",
                  background: "#ffdfbd",
                  color: "#bf8649",
                }}
                size="small"
              />
            );
          })}
          <br></br>
          <br></br>
          <Divider />
          <p>{definition}</p>
          <br></br>
          <div className={"bottomRightMessageButton"}>
            <Button
              style={{
                fontFamily: "Nunito",
                color: "#7867c5",
              }}
              onClick={() => {
                setMsgMode(true);
                setMessageKey(Math.random());
              }}
            >
              {"Messages"}
              &nbsp;
              <ChatBubbleIcon />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
export default MoodContainer;
>>>>>>> 75ed1faab04fbf44db07030db27053aad3f42353
