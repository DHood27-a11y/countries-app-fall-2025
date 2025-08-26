import CountryCard from "../components/CountryCard";

function Home({ countriesData }) {
  return (
    <>
      <div className="home">
        <h1>Countries</h1>
        <div className="countries-list">
          {countriesData.map((country) => (
            <CountryCard
              key={country.id}
              name={country.name}
              region={country.region}
              population={country.population}
              flag={country.flag}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
