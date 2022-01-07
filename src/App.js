import "./App.css";
import SendMessage from "./pages/SendMessage";
import Feelings from "./pages/Feelings";
import MoodBoard from "./pages/MoodBoard";
import Dashboard from "./pages/Dashboard";
import NavMenu from "./components/NavMenu";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <NavMenu />
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/" element={<SendMessage />} />
        <Route exact path="/feelings" element={<Feelings />} />
        <Route exact path="/Happy" element={<MoodBoard mood={"Happy"} />} />
        <Route exact path="/Sad" element={<MoodBoard mood={"Sad"} />} />
        <Route exact path="/Angry" element={<MoodBoard mood={"Angry"} />} />
        <Route exact path="/Loved" element={<MoodBoard mood={"Loved"} />} />
      </Routes>
    </Router>
  );
}

export default App;
