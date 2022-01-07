import db from "../config";
import { useState } from "react";
import { Tooltip, IconButton, Button } from "@mui/material";
import { allEmotions, emotionsNumMap, emotionsMap } from "./misc/content";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CircularProgress from "@mui/material/CircularProgress";
import JSConfetti from "js-confetti";

const InputForm = () => {
  const [emo, setEmo] = useState(null);
  const [emoSelected, setEmoSelected] = useState(false);
  const [messageStatus, setMessageStatus] = useState(false);
  const confetti = new JSConfetti();
  const writeMessageToFB = () => {
    if (!messageStatus && emoSelected) {
      let writeObj = {
        message: document.getElementById("textAreaInput").value,
        emotion: emotionsNumMap[emo],
        timestamp: new Date(),
      };
      db.collection("messages")
        .add(writeObj)
        .then(
          //sets message status to prevent spam
          () => {
            setMessageStatus(true);
          }
        )
        .catch((error) => {
          //prints error message
          console.error(error);
        });
    }
  };
  return (
    <>
      {messageStatus ? (
        <div>
          <CircularProgress
            style={{
              color: "#5959ff",
            }}
          />
        </div>
      ) : (
        <div className={"SMContainer"}>
          <div className={"centerContent"}>
            {emo ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "0px",
                }}
              >
                <div>
                  <IconButton
                    onClick={() => {
                      setEmo(null);
                      setEmoSelected(false);
                    }}
                  >
                    <ArrowBackIosIcon
                      style={{ color: "#7867c5" }}
                    ></ArrowBackIosIcon>
                  </IconButton>
                </div>
                <div>
                  <h2
                    style={{
                      marginTop: "5px",
                      color: "#7867c5",
                      fontFamily: "Nunito",
                    }}
                  >
                    {emo} {emotionsMap[emo]}
                  </h2>
                </div>
              </div>
            ) : (
              <div>
                {allEmotions.map((item, key) => {
                  return (
                    <Tooltip title={item} key={key} placement="top">
                      <IconButton
                        component="span"
                        color="primary"
                        style={{
                          fontSize: "75px",
                          width: "50px",
                          margin: "0px 30px",
                        }}
                        onClick={() => {
                          setEmo(item);
                          setEmoSelected(true);
                          confetti.addConfetti({
                            emojis: [emotionsMap[item]],
                          });
                        }}
                      >
                        {emotionsMap[item]}
                      </IconButton>
                    </Tooltip>
                  );
                })}
              </div>
            )}
          </div>
          <div className={"centerContent"}>
            <textarea id={"textAreaInput"}></textarea>
          </div>
          <div className={"centerContent"}>
            <Button
              variant="contained"
              size="large"
              className={"centerContent"}
              style={{
                background: "#5959FF",
                fontStyle: "Bold",
              }}
              onClick={() => {
                writeMessageToFB();
              }}
            >
              Send ✈️
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
export default InputForm;
