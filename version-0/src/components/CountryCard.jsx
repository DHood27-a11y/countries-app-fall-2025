function CountryCard({ name, region, population, flag }) {
  return (
    <>
      <div className="country-card">
        <img src={flag} alt={name} className="country-flag" />
        <h2 className="country-name">{name}</h2>
        <p className="country-region">Region: {region}</p>
        <p className="country-population">Population: {population}</p>
      </div>
    </>
  );
}

export default CountryCard;
