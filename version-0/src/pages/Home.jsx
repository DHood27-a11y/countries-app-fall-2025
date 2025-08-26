import CountryCard from "../components/CountryCard";

//created function called Home that takes "countriesData" as its prop
//then created a class named called "countries-list" for structure purposes
//looped through countriesData array using .map and embedded CountryCard component so that I can render it on Home page and gave it attributes according to data.js and each attribute gets a value of a prop based on the attribute name and what should be displayed in each card
function Home({ countriesData }) {
  return (
    <>
      <div className="home">
        <h1>Countries</h1>
        <div className="countries-list">
          {countriesData.map((country, index) => (
            <CountryCard
              key={index}
              name={country.name.common}
              region={country.region}
              population={country.population}
              capital={country.capital}
              flag={country.flags.png}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
