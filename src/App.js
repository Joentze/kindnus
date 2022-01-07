import './App.css';
import SendMessage from './pages/SendMessage';
import Feelings from './pages/Feelings'
import MoodBoard from './pages/MoodBoard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path = "/" element={<SendMessage/>}/>
        <Route exact path = "/feelings" element={<Feelings/>}/>
        <Route exact path = "/Happy" element={<MoodBoard mood={"Happy"}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
