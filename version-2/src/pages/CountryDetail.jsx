import { useNavigate, useParams } from "react-router-dom";
import "../CountryDetail.css";
import { useState, useEffect } from "react";

//for back button: https://stackoverflow.com/questions/52039083/handle-back-button-with-react-router

function CountryDetail({ countriesData }) {
  /* ------------- Country View Count(not finished) -------------- */
  // created a useState to track how many times a country has been viewed and set initial state to 0 since we will be going up by 1 each time
  const [viewCount, setViewCount] = useState(0);

  //I want this function to run once when the card is rendered
  useEffect(() => {
    //will be getting the view counts from localStorage and if it doesnt exist we will start with an empty object. JSON.parse will convert string back into original data type
    const savedViews = JSON.parse(localStorage.getItem("countryViews")) || {};

    //I want to make sure the count for each country is current and default it to 0
    const count = savedViews[name] || 0;

    // I want to make the count increase by one which will ultimately update the state
    setViewCount(count + 1);

    //Created a new object that will have updated count for selected country
    const updatedViews = { ...savedViews, [name]: count + 1 };

    //now I want to save my updated view count to the localStorage by using .setItem and .stringify method
    localStorage.setItem("countryViews", JSON.stringify(updatedViews));
  }, []);

  //declared function called CountryDetail and gave it a parameter of countriesData given that is what contains data object
  const { countryName } = useParams();
  //this function pulls the countryName value from the API fetch URL
  const navigate = useNavigate();

  /* ------- FIRST FUNCTION: selectedCountry ------------*/
  //this function helps the user be able to navigate to a different page
  function selectedCountry(country) {
    //this function just checks to make sure a country's name matches the one in the URL and returns the result
    return country.name.common === countryName;
  }
  //this function uses the .find method to find the first country that matches
  const country = countriesData.find(selectedCountry);

  if (!country) return <p>Country not found</p>;
  //the ternary statement just says if no country was found because the name didnt match show the following message, otherwise just show the country's detail page

  /* --------- SECOND FUNCTION: handleSave ------------- */
  //this function will save the country to localStorage when user clicks the save button
  const handleSave = () => {
    let savedCountries;

    try {
      //the try catch method will get savedCountries from localStorage and convert string to array using .parse method and if nothing is there then it will be an empty array
      savedCountries = JSON.parse(localStorage.getItem("savedCountries")) || [];
    } catch {
      savedCountries = [];
    }

    //this will track if a country is saved already or not
    let alreadySaved = false;

    /*  ---------- LOOPING AND IF ELSE STATEMENT ----------- */
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
      alert(`${country.name.common} is already saved.`);
    }
  };

  return (
    <>
      {/* ---------- STRUCTURE FOR COUNTRY DETAIL PAGE ------------ */}

      <div className="country-detail-container">
        {/* //Created the container div for styling as well as structural purposes 
    // The back button when clicked(onClick) should take the user back to the prev page using the navigate function */}
        <button className="back-button" onClick={() => navigate(-1)}>
          {" "}
          ← Back{" "}
        </button>
        {/* // Created the div for "country-detail-main" to styling and structural */}
        <div className="country-detail-main">
          {/* used img tag for picture of flag gave the following attributes: src-where the image file is from, alt-the description of the flag in case it doesnt show, className-for styling and structural purposes */}
          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            className="country-flag"
          />
          {/* created div "country-info" for structural and styling purposes */}
          <div className="country-info">
            {/* used an h1 element to display the name of the country and passed in country.name.common from the data object */}
            <h1 className="country-name">{country.name.common}</h1>
            {/* given the UI design provided next I created a save button */}
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
            {/* next I created a p tag that will be for the population and passed in country.population from the data object and .toLocaleString() is so that the commas are included */}
            <p>
              <strong>Population:</strong> {country.population.toLocaleString()}
            </p>
            {/* created another p tag for the region and passed in country.region from data object */}
            <p>
              <strong> Region: </strong>
              {country.region}
            </p>
            {/* created a p tag and passed country.capital from data object and put ternary statement to say if the country exists display the first one and if not show the message "N/A" */}
            <p>
              <strong>Capital:</strong>{" "}
              <span>{country.capital?.[0] || "N/A"}</span>
            </p>
            <div className="view-count">
              <h3>{name}</h3>
              <p>
                <strong>Viewed: </strong>
                {viewCount} times
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CountryDetail;
