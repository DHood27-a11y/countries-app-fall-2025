import { useEffect, useState } from "react";
import CountryCard from "../components/CountryCard";

function SavedCountries() {
  //Here I created my Saved countries page and created and empty form state (all fields will be blank until user types)

  const emptyFormState = {
    fullName: "",
    email: "",
    country: "",
    bio: "",
  };

  // ----------- UseState --------------------

  //formData will hold the info the user is typing in the form
  const [formData, setFormData] = useState(emptyFormState);

  //userInfo will hold the saved profile info after the form is submitted
  const [userInfo, setUserInfo] = useState(null);

  //savedCountries will hold the list of countries that user chose to save
  const [savedCountries, setSavedCountries] = useState([]);

  //------------ Handle Change ------------------------

  //next I created handleChange function that will run each time user types or changes something on the form

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //------------- Handle Submit ------------------
  /*
  the handleSubmit function will run when the form is submitted and useState setter
   function will take the initial state and keep everything that was already there
   (prev) and only update the field that changed
  */

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("data:", formData);
    //this will reset the form when the page is refreshed.
    localStorage.removeItem("profile");

    //Saving form data into localStorage and stringify the data object

    localStorage.setItem("profile", JSON.stringify(formData));

    //then updating the userInfo state with formData so that the welcome message will show
    setUserInfo(formData);

    //then I want to reset the form back to empty so that when page refreshes it can be filled out again potentially by someone else
    setFormData(emptyFormState);
  };

  //------------- USE EFFECT -------------------

  //I want my useEffect run once when the page loads so I will give it an empty dependency array
  useEffect(() => {
    //gets the saved countries from localStorage
    const saved = localStorage.getItem("savedCountries");
    //Parses string into array and will go into setter function as a new array
    if (saved) {
      const countries = JSON.parse(saved);
      setSavedCountries(countries);
    }
  }, []);

  //------------- Return/Rendering ------------------------

  return (
    <>
      {/* ---------- FORM --------------------
      
      
//for each input the type is equal to the type of input the user will be doing,
//  the name identifies the type of input needed, the placeholder is what will be in the input field to let the user know what they are typing, 
// each input has a value prop that is connected to the formData which holds all the values of the form fields,
//  onChange calls handleChange so typing is updated/tracked by each keystroke
//lastly I gave it a submit button that will store info once form is submitted */}

      {/* I want to render this message only if userInfo exists*/}
      {userInfo && <h2>Welcome {userInfo.fullName}</h2>}
      <div className="saved-countries-form">
        <h2>My Saved Countries</h2>
        {/* ---------- MAPPING AND EMBEDDING -------------- */}
        <div className="country-list">
          {/* I imported Country card given I want to reuse the same card design/component that I made for the Home page.
        This way my saved countries will display using the same layout.  */}

          {/* This will show a message if no countries are saved */}
          {savedCountries.length === 0 && <p>No countries saved. </p>}
          {/* Mapped over savedCountries array and embedded Country card */}
          {savedCountries.map((country, index) => (
            <CountryCard key={index} country={country} />
          ))}
        </div>
        <h2>My Profile</h2>
        {/* //for my actual form I created a form element and passed in my handleSubmit which onSubmit will call once the form is actually submitted */}
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
    </>
  );
}

export default SavedCountries;
