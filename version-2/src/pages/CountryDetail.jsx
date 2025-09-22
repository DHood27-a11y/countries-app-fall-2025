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

  if (!country) return <p>Country not found</p>;
  //the ternary statement just says if no country was found because the name didnt match show the following message, otherwise just show the country's detail page

  //this function will save the country to localStorage when user clicks the save button
  const handleSave = () => {
    let savedCountries;

    try {
      //this function will get savedCountries from localStorage and convert string to array using .parse method and if nothing is there then it will be an empty array
      savedCountries = JSON.parse(localStorage.getItem("savedCountries")) || [];
    } catch {
      savedCountries = [];
    }

    //this will track if a country is saved already or not
    let alreadySaved = false;

    //Looping through each saved country to check for duplicates
    for (let i = 0; i < savedCountries.length; i++) {
      //check if the current saved country matches the country the user wanted saved
      if (savedCountries[i].name.common === country.name.common) {
        //If the country matches mark it as already saved
        alreadySaved = true;
        //if its not a match keep alreadySaved as false or do nothing
      }
    }
    //using bang operator to check if the country has NOT been saved already
    if (!alreadySaved) {
      //If the country is not in the saved list then add it using .push method
      savedCountries.push(country);
      //then I want to update the localStorage with the new savedCountries array
      localStorage.setItem("savedCountries", JSON.stringify(savedCountries));
      //then I want to notify the user that the country has been added to saved list by using alert function with a template literal to display message to user
      alert(`${country.name.common} saved!`);
    } else {
      //if the country has already been saved I also want to notify the user so they will know
      alert(`{$country.name.common} is already saved.`);
    }
  };

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
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
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
