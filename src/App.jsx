import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import HourlyForecast from "./pages/HourlyForecast";
import FiveDayForecast from "./pages/FiveDayForecast";
import Navbar from "./components/Navbar";
import "./styles/global.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hourly-forecast" element={<HourlyForecast />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/five-day-forecast" element={<FiveDayForecast />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
