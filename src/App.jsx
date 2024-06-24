import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// images
import Logo from "./assets/logo-gamepad.png";

// Components
import Header from "./components/Header";

// Pages
import Games from "./pages/Games";
import GameDetail from "./pages/GameDetail";

const App = () => {
  return (
    <Router>
      <Header logo={Logo} />
      <Routes>
        <Route path="/" element={<Games />} />
        {/* <Route path="/projet/:id" element={<Projet />} /> */}
        <Route path="/game/:id" element={<GameDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
