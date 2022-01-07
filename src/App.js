import './App.css';
import SendMessage from './pages/SendMessage';
import {Router, Routes, Route} from 'react-router'
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
