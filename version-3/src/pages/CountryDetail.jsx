import { useNavigate, useParams } from "react-router-dom";
import "../CountryDetail.css";
import { useState, useEffect } from "react";

//for back button: https://stackoverflow.com/questions/52039083/handle-back-button-with-react-router

/* -------  find selected country ------------*/

function CountryDetail({ countriesData }) {
  /* ------------- Country View Count(not finished) -------------- */
  // created a useState to track how many times a country has been viewed and set initial state to 0 since we will be going up by 1 each time
  const [viewCount, setViewCount] = useState(0);
  const { countryName } = useParams();
  const navigate = useNavigate();

  /* ---------  handleSave ------------- */
  //this function will save the country to localStorage when user clicks the save button
  const handleSave = async () => {
    try {
      await fetch("https://backend-answer-keys.onrender.com/save-one-country", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ country_name: countryName }),
      });
      alert(`${countryName} saved!`);
    } catch (error) {
      console.error("Error saving country", error);
    }
  };

  //----Fetch for updated view count---
  const updateViewCount = async () => {
    try {
      const response = await fetch(
        "https://backend-answer-keys.onrender.com/update-one-country-count",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ country_name: countryName }),
        }
      );
      const data = await response.json();
      //Only update state if count has changed
      if (data.count !== viewCount) {
        setViewCount(data.count);
      }
    } catch (error) {
      console.error("Error updating country view count", error);
    }
  };

  //---Find selected Country
  const country = countriesData.find(
    (country) => country.name.common === countryName
  );

  // //--USE EFFECT----////
  useEffect(() => {
    if (country) updateViewCount();
  }, [countryName, country]);

  //--Render message ------
  if (!country) return <p>Country not found</p>;

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
            style={{
              width: "650px",
              height: "auto",
              maxWidth: "100%",
              border: "1px solid #ddd",
              borderRadius: "8px",
              objectFit: "contain",
              display: "block",
            }}
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
              <h3>{country.name.common}</h3>
              <p>
                <strong>Viewed: </strong>
                {viewCount} times
              </p>
              <div className="all-country-counts"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CountryDetail;
