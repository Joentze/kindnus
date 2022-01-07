import EmotionButtonArray from "../components/EmotionButtonArray"
import MainBackground from "../components/MainBackground"
const Feelings =()=>{
    return (
        <>
        <MainBackground/>
        <div className={"headerTitlePage"}>
            <h1>I am Feeling...</h1>
        </div>
        <div class={'centerContent'}>
            <EmotionButtonArray/>
        </div>
        </>
    )
}

export default Feelings