import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";

export default function CountryCard({ country }) {
  //countryCard function was given country prop that contains the following: country.name, country.flag, country.region, and country.capital

  //created a useState to track how many times a country has been viewed and set initial state to 0 since we will be going up by 1 each time
  // const [viewCount, setViewCount] = useState(0);

  // //I want this function to run once when the card is rendered
  // useEffect(() => {
  //   //will be getting the view counts from localStorage and if it doesnt exist we will start with an empty object. JSON.parse will convert string back into original data type
  //   const savedViews = JSON.parse(localStorage.getItem("countryViews")) || {};

  //   //I want to make sure the count for each country is current and default it to 0
  //   const count = savedViews[name] || 0;

  //   // I want to make the count increase by one which will ultimately update the state
  //   setViewCount(count + 1);

  //   //Created a new object that will have updated count for selected country
  //   const updatedViews = { ...savedViews, [name]: count + 1 };

  //   //now I want to save my updated view count to the localStorafe by using .setItem and .stringify method
  //   localStorage.setItem("countryViews", JSON.stringify(updatedViews));
  // }, []);

  //the card is wrapped in Link component from react-router-dom which makes card clickable and takes user to url /country/country.name (getting error message that says cant read. Tried changing to name.common as well and still didnt work)

  return (
    <Link to={`/country/${country.name.common}`} className="country-link">
      {/* This div is main container for country card */}
      <div className="country-card">
        {/* Flag image for country, comes property flag in data object*/}
        <img
          src={country.flag}
          alt={country.name}
          style={{
            borderRadius: "10px 10px 0px 0px",
            width: "100%",
            height: "150px",
            objectFit: "cover",
            backgroundColor: "#ccc",
            display: "block",
          }}
          className="country-flag"
        />
        {/* Country name comes from property in data object called name*/}
        <h2 className="country-name">{country.name.common}</h2>
        {/* Used Intl.NumberFormat to give commas*/}
        <p className="country-population">
          Population:{" "}
          {new Intl.NumberFormat("en-US").format(country.population)}
        </p>
        <p className="country-region">Region: {country.region}</p>
        {/* This says if capital exists show it if not show N/A */}
        <p className="country-capital">Capital: {country.capital || "N/A"}</p>
      </div>
    </Link>
  );
}

// I embedded my Link and set the value of my prop to my dynamic URL so that when the card is clicked it accesses the country info and goes to Country Details page
// I gave a class name of country-card for styling/structural purposes
// I created an image tag that receives the props "name" and "flag"
// Then a h2 that will be for country's name and passed in the prop "name"
// Then a p tag for the countries population and passed in the prop "population" and used https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat for adding commas
// Then a p tag for the countries region and passed in the prop "region"
// Then a p tag for the countries capital and passed in the prop "capital" and then I used a ternary operator given each object has multiple capital key values within them so I just want to show the first capital in the array and if nothing is available then I want to display N/

//This component doesnt handle fetching data or saving it. It only takes data passed down by props and renders it.
