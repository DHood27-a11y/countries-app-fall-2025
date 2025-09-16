import { useEffect, useState } from "react";

function SavedCountries() {
  //Here I created my function for Saved countries page and created and empty form state (all fields will be blank until user types)

  const emptyFormState = {
    fullName: "",
    email: "",
    country: "",
    bio: "",
  };

  //formData will hold the info the user is typing in the form
  const [formData, setFormData] = useState(emptyFormState);

  //userInfo will hold the saved profile info after the form is submitted
  const [userInfo, setUserInfo] = useState(null);

  //savedCountries will hold the list of countries that user chose to save
  const [savedCountries, setSavedCountries] = useState([]);

  //next I created handleChange function that will run each time user types or changes something on the form

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //the handleSubmit function will run when the form is submitted and useState setter function will take the initial state and keep everything that was already there(prev) and only update the field that changed
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("data:", formData);

    //Saving form data into localStorage and stringify the data object
    localStorage.setItem("profile", JSON.stringify(formData));

    //then updating the userInfo state with formData so that the welcome message will show
    setUserInfo(formData);

    //then I want to reset the form back to empty so that when page refreshes it can be filled out again potentially by someone else
    setFormData(emptyFormState);
  };

  //I want my useEffect run once when the page loads so I will give it an empty dependency array
  useEffect(() => {
    //this if statement says if the profile exists from localStorage show it
    if (localStorage.getItem("profile")) {
      //then we want to turn the string back into an object by using .parse method
      let profileData = JSON.parse(localStorage.getItem("profile"));
      //we want to put the data from the profile into our useState so it shows the welcome message
      setUserInfo(profileData);
    }
    //this if statement says if saved countries list exists from localStorage then show it
    if (localStorage.getItem("savedCountries")) {
      //again we want to turn the string back into an object by using the .parse method
      const countries = JSON.parse(
        //then I want to put my array into my savedCountries useState so I can map through it
        localStorage.getItem("savedCountries")
      );
      setSavedCountries(countries);
    }
  }, []);

  return (
    <>
      {/* //for my actual form I created a form element and passed in my handleSubmit which onSubmit will call once the form is actually submitted
//for each input the type is equal to the type of input the user will be doing, the name identifies the type of input needed, the placeholder is what will be in the input field to let the user know what they are typing, each input has a value prop that is connected to the formData which holds all the values of the form fields, onChange calls handleChange so typing is updated/tracked by each keystroke
//lastly I gave it a submit button that will store info once form is submitted */}

      {/* I want to render this message only if userInfo exists so I created an if statement*/}
      {userInfo && <h2>Welcome {userInfo.fullName}</h2>}
      <div className="saved-countries-form">
        <h2>My Saved Countries</h2>
        <h2>My Profile</h2>
        <form className="profile-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
          />

          <textarea
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="country-list">
        {/* I want to check if countries exist so that when they are saved they will show so I will be using .map method as well as looping then I want to render the saved country/countries to the page */}
        {savedCountries.map((country, index) => {
          <div key={index} className="saved-country">
            <h3>{country.name}</h3>
            <p>Region: {country.region}</p>
            <p>Population: {country.population}</p>
          </div>;
        })}
      </div>
    </>
  );
}

export default SavedCountries;
