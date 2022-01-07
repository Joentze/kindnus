<<<<<<< HEAD
import { emotionsNumMap, emotionsWriteUp } from "../components/misc/content"
import MoodBackground from "../components/MoodBackground"
import MoodContainer from "../components/MoodContainer"
const MoodBoard =({mood})=>{
    let content = emotionsWriteUp[mood]
    let feelingNo = emotionsNumMap[mood]
    return (
        <>
        <MoodBackground/>
        <div className={"moodBoardMainContainer centerContent"}>
            <div className={"moodBoardSubContainer centerContent"}>

            </div>
            <div className={"moodBoardSubContainer centerContent"}>
                <MoodContainer
                    content = {content}
                    mood = {feelingNo}
                ></MoodContainer>
            </div>
        </div>
        </>
    )
}
export default MoodBoard
=======
import { emotionsNumMap, emotionsWriteUp } from "../components/misc/content";
import MoodBackground from "../components/MoodBackground";
import MoodContainer from "../components/MoodContainer";
import LineChart from "../components/LineChart";
const MoodBoard = ({ mood }) => {
  let content = emotionsWriteUp[mood];
  let feelingNo = emotionsNumMap[mood];
  return (
    <>
      <MoodBackground />
      <div className={"moodBoardMainContainer centerContent"}>
        <div className={"moodBoardSubContainer centerContent"}>
          <LineChart />
        </div>
        <div className={"moodBoardSubContainer centerContent"}>
          <MoodContainer content={content} mood={feelingNo}></MoodContainer>
        </div>
      </div>
    </>
  );
};
export default MoodBoard;
>>>>>>> 75ed1faab04fbf44db07030db27053aad3f42353
