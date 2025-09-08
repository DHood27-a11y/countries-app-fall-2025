//created a function called CountryCard and gave it the following props based on data.js file: name, region, population, capital, and flag
//I gave a class name of country-card for styling/structural purposes
//I created an image tag that receives the props "name" and "flag"
//Then a h2 that will be for country's name and passed in the prop "name"
//Then a p tag for the countries population and passed in the prop "population"
//Then a p tag for the countries region and passed in the prop "region"
//Then a p tag for the countries capital and passed in the prop "capital"

function CountryCard({ name, region, population, capital, flag }) {
  return (
    <>
      <div className="country-card">
        <p> Test </p>
        <img src={flag} alt={name} className="country-flag" />
        <h2 className="country-name">{name}</h2>
        <p className="country-population">Population: {population}</p>
        <p className="country-region">Region: {region}</p>
        <p className="country-capital">Capital: {capital}</p>
      </div>
    </>
  );
}

export default CountryCard;
