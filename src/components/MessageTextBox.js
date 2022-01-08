import db from "../config";
import { useState } from "react";
import { Tooltip, IconButton, Button } from "@mui/material";
import { allEmotions, emotionsNumMap, emotionsMap } from "./misc/content";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CircularProgress from "@mui/material/CircularProgress";
import JSConfetti from "js-confetti";
import { useNavigate } from "react-router";

import Filter from "bad-words";

const InputForm = () => {
  const filter = new Filter();
  const [errorMessage, setErrorMessage] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [emo, setEmo] = useState(null);
  const [emoSelected, setEmoSelected] = useState(false);
  const [messageStatus, setMessageStatus] = useState(false);
  const confetti = new JSConfetti();
  let navigate = useNavigate();

  const writeMessageToFB = () => {
    const userMessage = document.getElementById("textAreaInput").value;

    const handleError = (message) => {
      setHasError(true);
      setErrorMessage(message);
    };

    // Profanity
    if (filter.isProfane(userMessage))
      return handleError("Please write a nice message :)");

    // Too little words
    if (userMessage.length < 40)
      return handleError("Please write a little bit more :)");

    // Emoji not selected
    if (!emoSelected) return handleError("Please select one of the emojis :)");

    if (!messageStatus) {
      let writeObj = {
        message: userMessage,
        emotion: emotionsNumMap[emo],
        timestamp: new Date(),
      };
      db.collection("messages")
        .add(writeObj)
        .then(
          //sets message status to prevent spam
          () => {
            setMessageStatus(true);
            setHasError(false);
            navigate("/feelings");
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
        <div className={"centerContent loadingBoxCircular"}>
          <CircularProgress
            style={{
              marginTop: "5px",
              color: "#7867c5",
              fontFamily: "Nunito",
            }}
          />
        </div>
      ) : (
        <div className={"SMContainer"}>
          <div className={" emojiContainer centerContent"}>
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
                      fontSize: "20px",
                      fontFamily: "Nunito",
                    }}
                  >
                    {emo} {emotionsMap[emo]}
                  </h2>
                </div>
              </div>
            ) : (
              <div className={"centerContent emojiArray"}>
                {allEmotions.map((item, key) => {
                  return (
                    <Tooltip title={item} key={key} placement="top">
                      <IconButton
                        component="span"
                        color="primary"
                        style={{
                          width: "50px",
                          margin: "5px",
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
            {hasError ? ( 
              <div className={"centerContent"} style={{ background: "rgba(220,220,220,0.5)", padding: "2px", borderRadius:"10px" }}>
                <p style={{ textAlign: "center", fontSize: "14px", color:"#b91c1c;" }}>{errorMessage}</p>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={"centerContent"}>
            <textarea id={"textAreaInput"} className={"textAreaBox"}></textarea>
          </div>
          <div className={"centerContent sendButtonMsgPage"}>
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
      ;
    </>
  );
};
export default InputForm;
