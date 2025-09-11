import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import SavedCountries from "./pages/SavedCountries";
import CountryDetail from "./pages/CountryDetail";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  //declared a function called app and created a useState variable called Countries with setter function  to store countries from API provided and that will be stored inside the empty array that I set as the value of the inital state

  const getCountries = () => {
    //declared a function called getCountries and used fetch to gather API info from URL provided, .then waits for the fetch to finish first and then gets the response or response.json
    //response.json turns the reponse into something that JS can actually read (an object in this case)
    //the next .then is connected to the data from the API and that data holds the array of all the countries from the data object that was converted
    //then the data is saved within my setter function or setCountries
    //.catch just catches any errors if the api fetch were to have any mishaps and then of course we console log to see the exact error that was found

    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,cca3,borders"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  //useEffect just makes sure the component runs at a specific time (Had to google this and paraphrase) in this case it will run AFTER the page renders
  //for this api call I want my getCountries function to run when the page first loads and then we want it to only run ONCE which is why we use an empty array (otherwise known as the "dependency array")
  useEffect(() => {
    getCountries();
  }, []);

  return (
    <>
      {/* //Here I created a header section that will consist of two nav bar links
  //The first link will be to the home page and the second link to the saved countries page
  //The Routes embed just defines clear path for each route
  // "/" renders the Home component and passes in the countries data as a prop to render list of countries
  //"/saved" renders the SavedCountries component and also passes in countriesData prop so that SavedCountries component can access the same data
  //"/country/:countryName" renders the CountryDetail component by using dynamic route or :countryName which helps target each indiviual country data when a country card is clicked
  //This also takes countriesData as a prop to find and display the selected countries info */}

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
        <Route path="/" element={<Home countriesData={countries} />} />
        <Route
          path="/saved"
          element={<SavedCountries countriesData={countries} />}
        />
        <Route
          path="/country/:countryName"
          element={<CountryDetail countriesData={countries} />}
        />
      </Routes>
    </>
  );
}

export default App;
