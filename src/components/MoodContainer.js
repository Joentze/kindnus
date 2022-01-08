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
            <br></br>
            <p>{}</p>
        </div>
    )
}
export default MoodContainer