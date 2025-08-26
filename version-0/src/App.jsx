import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";
import SavedCountries from "./pages/SavedCountries";
import CountryDetail from "./pages/CountryDetail";
import { Link } from "react-router";
import "./App.css";

function App() {
  return (
    <>
      <h1>Countries App</h1>
      <Router>
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/">Where in the world?</Link>
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
      </Router>
    </>
  );
}

export default App;
