import CountryCard from "../components/CountryCard";

//created function called Home that takes "countriesData" as its prop
//then created a class name called "countries-list" for structure purposes
//looped through countriesData array using .map and gave it a parameter of country then I embedded CountryCard component so that I can render it on Home page and gave it attributes according to data object and each attribute gets a value of a prop based on the attribute name and what should be displayed in each card
//chose country.cca3 given the country code is UNIQUE to each country but included in each object, country.name.common given there are two different key values within the name object in data object, country.region accesses region from data object, country.population acceses population from data object, country.capital accesses capital from data object, and country.flags.png accesses flag and within flag I accessed png to pull actual image
//used the following source to help with alphabetizing countries https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/
//so I created a function for putting the countries in alpahbetical order and included the array from the data object or "countriesData" given thats what holds the info needed then I used .sort which will rearrange the items in the array in order

//Questions I had:
//When it comes to the key Im not sure I even need it in this case given the structure of the figma design but want to make sure... -ANSWERED BY TA  (she stated that it should be something that each object has in common but helps tell them apart given it should be unique to each)
// some countries have multiple capitals or none so Im trying to see if I can use my if else within the .map or if there is a way to do it within the embed.... -ANSWERED BY TA

//usually starts with data in which you can then run a method or function
//you can chain and or nest methods together using dot notation
//thought process: want to take my data (countriesData) and sort through it and in return get objects in alphabetical order

//Psuedocode portion:
countriesData.sort;

function Home({ countriesData }) {
  return (
    <>
      <div className="home">
        <h1>Countries</h1>
        <div className="countries-list">
          {countriesData.map((country) => (
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
