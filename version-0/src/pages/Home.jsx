import CountryCard from "../components/CountryCard";

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
