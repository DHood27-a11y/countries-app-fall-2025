import CountryCard from "../components/CountryCard";

function Home({ countriesData }) {
  //declared a function called Home that takes "countriesData" as its prop
  //used the following source to help with alphabetizing countries https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/
  //so I declared a function for putting the countries in alpahbetical order (alphabeticalCountries) and then included the array from the data object or "countriesData" given thats what holds the info needed, then I used .sort which will rearrange the items in the array in order
  //.sort(a,b) = goes through the array two items at a time (a and b) or (Afghanistan and Aland Islands then Aland Islands and Albania and so on and so forth) and it compares the item so that they can then be rearranged or "sorted" in alphabetical order
  //a.name.common.localeCompare(b.name.common) = targets the name.common property of each object in the array and the purpose of localeCompare(got definition from MDN docs) is to "returns a number indicating whether this string comes before, or after, or is the same as the given string in sort order" so in this case its establishing the order of things or countries

  const alpahbeticalCountries = [...countriesData].sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  );

  return (
    <>
      {/* //then created a class name called "home" as well as "countries-list" for structure/styling purposes
//then I looped through countriesData array using .map and gave it a parameter of country then I embedded CountryCard component so that I can render it on Home page and gave it attributes according to data object and each attribute gets a value of a prop based on the attribute name and what should be displayed in each card
//I chose country.cca3 for the value of my key attribute given the country code is UNIQUE to each country but included in each object, country.name.common given there are two different key values within the name object in data object, country.region accesses region from data object, country.population acceses population from data object, country.capital accesses capital from data object, and country.flags.png accesses flag and within flag I accessed png to pull actual image */}

      <div className="home">
        <div className="countries-list">
          {alpahbeticalCountries.map((country) => (
            <CountryCard
              key={country.cca3}
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
