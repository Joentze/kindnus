import InputForm from "../components/MessageTextBox"
import MainBackground from '../components/MainBackground'
const SendMessage =()=>{
    return (
        <>
            <MainBackground/>
            <div className={"headerTitlePage"}>
                <h1>Send a Message</h1>
                <p>to Someone Feeling...</p>
            </div>
            <InputForm/>
        </>
    )
}
export default SendMessage