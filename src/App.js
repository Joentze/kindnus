import './App.css';
import SendMessage from './pages/SendMessage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path = "/" element={<SendMessage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
