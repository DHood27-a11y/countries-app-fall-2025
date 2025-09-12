import { useNavigate, useParams } from "react-router-dom";
import "./CountryDetail.css";

//for back button: https://stackoverflow.com/questions/52039083/handle-back-button-with-react-router

function CountryDetail({ countriesData }) {
  //declared function called CountryDetail and gave it a parameter of countriesData given that is what contains data object
  const { countryName } = useParams();
  //this function pulls the countryName value from the API fetch URL
  const navigate = useNavigate();
  //this function helps the user be able to navigate to a different page
  function selectedCountry(country) {
    //this function just checks to make sure a country's name matches the one in the URL and returns the result
    return country.name.common === countryName;
  }
  //this function uses the .find method to find the first country that matches
  const country = countriesData.find(selectedCountry);

  if (!country) {
    return <p>Country not found</p>;
    //the ternary statement just says if no country was found because the name didnt match show the following message, otherwise just show the country's detail page
  }

  return (
    <>
      {/* //Created the container div for styling as well as structural purposes 
    // The back button when clicked(onClick) should take the user back to the prev page using the navigate function
    // Created the div for "country-detail-main" to styling and structural
    // used img tag for picture of flag gave the following attributes: src-where the image file is from, alt-the description of the flag in case it doesnt show, className-for styling and structural purposes
    // created div "country-info" for structural and styling purposes
    // used an h1 element to display the name of the country and passed in country.name.common from the data object
    // given the UI design provided next I created a save button
    // next I created a p tag that will be for the population and passed in country.population from the data object and .toLocaleString() is so that the commas are included
    // created another p tag for the region and passed in country.region from data object
    // created a p tag and passed country.capital from data object and put ternary statement to say if the country exists display the first one and if not show the message "N/A"*/}
      <div className="country-detail-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          {" "}
          ← Back{" "}
        </button>
        <div className="country-detail-main">
          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            className="country-flag"
          />
          <div className="country-info">
            <h1 className="country-name">{country.name.common}</h1>
            <button className="save-button">Save</button>
            <p>
              <strong>Population:</strong> {country.population.toLocaleString()}
            </p>
            <p>
              <strong>Region:</strong>
              {country.region}
            </p>
            <p>
              <strong>Capital:</strong>{" "}
              <span>{country.capital?.[0] || "N/A"}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CountryDetail;
