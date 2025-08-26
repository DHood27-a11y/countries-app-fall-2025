import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import SavedCountries from "./pages/SavedCountries";
import CountryDetail from "./pages/CountryDetail";
import localData from "../localData";
import "./App.css";

function App() {
  return (
    <>
      <h1>Countries App</h1>

      <header>
        <nav>
          <ul>
            <li>
              <Link to="/" className="bold-link">
                Where in the world?
              </Link>
            </li>
            <li>
              <Link to="/saved">Saved Countries</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home countriesData={localData} />} />
        <Route path="/saved" element={<SavedCountries />} />
        <Route path="/country" element={<CountryDetail />} />
      </Routes>
    </>
  );
}

export default App;
