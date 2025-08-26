import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import SavedCountries from "./pages/SavedCountries";
import CountryDetail from "./pages/CountryDetail";
import localData from "../localData";
import "./App.css";

//Here I created a header section that will consist of nav bar links
//The first link will be to the home page and the second link to the saved countries page
//The Routes embed just defines clear path for each route
// "/" renders the Home component and passes in the countries data from our localData.js file
//"/saved" renders the SavedCountries component
//"/country" renders the CountryDetail component
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
