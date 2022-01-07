import './App.css';
import SendMessage from './pages/SendMessage';
import Feelings from './pages/Feelings'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path = "/" element={<SendMessage/>}/>
        <Route exact path = "/feelings" element={<Feelings/>}/>
      </Routes>
    </Router>
  );
}

export default App;
