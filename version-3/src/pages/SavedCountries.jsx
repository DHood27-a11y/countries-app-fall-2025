import { useEffect, useState } from "react";
import CountryCard from "../components/CountryCard";

function SavedCountries({ countriesData }) {
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

  //---------- ASYNC AND FETCH  ----------------------
  const getNewestUser = async () => {
    //declare a variable that will hold the response from the GET request to /get-newest-user
    try {
      const response = await fetch(
        "https://backend-answer-keys.onrender.com/get-newest-user"
      );
      //turn the response into json format
      const data = await response.json();
      console.log(data);
      const newestUserFromApi = data[0];
      //save the data in state
      setUserInfo({
        fullName: newestUserFromApi.name,
        email: newestUserFromApi.email,
        country: newestUserFromApi.country,
        bio: newestUserFromApi.bio,
      });
    } catch (error) {
      console.error("Couldnt get new user", error);
    }
  };

  //when we call the fetch() function, we only need to pass in
  //the API URL as one parameter when its a GET request
  //but we need to make a POST request, we have to pass in a second parameter: an OBJECT
  const storeUserData = async () => {
    try {
      const response = await fetch(
        "https://backend-answer-keys.onrender.com/add-one-user",

        {
          method: "POST",
          headers: {
            //the headers is where we put metadata about our request, including the data type that we pass in the body
            //in this case, we are saying we're passing in JSON data in the body
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.fullName,
            country_name: formData.country,
            email: formData.email,
            bio: formData.bio,
          }),
        }
      );
      const data = await response.json();
      console.log("User stored successfully", data);
    } catch (error) {
      console.error("Couldnt store user data", error);
    }
  };
  //This fetch call fetches all saved countries from backend
  const fetchSavedCountries = async () => {
    try {
      const response = await fetch(
        "https://backend-answer-keys.onrender.com/get-all-saved-countries"
      );
      const data = await response.json();
      console.log("Saved countries from API:", data);
      //had to use .map and .find method to get full country objects from countriesData
      const fullCountryObject = data.map((saved) =>
        countriesData.find(
          (country) => country.name.common === saved.country_name
        )
      );
      console.log("Full saved country object:", fullCountryObject);
      //save full object in useState setter function
      setSavedCountries(fullCountryObject);
    } catch (error) {
      console.error("Error fetching saved countries", error);
    }
  };

  //------------- USE EFFECT -------------------
  //This runs getNewestUser fetch call on page load and gave empty dependency array so that it only runs once
  useEffect(() => {
    getNewestUser();
  }, []);

  //I want my useEffect run once when the page loads AND ONLY IF COUNTRIESDATA EXISTS and gave it an empty dependency array so it only runs once
  useEffect(() => {
    if (countriesData) {
      fetchSavedCountries();
    }
  }, []);

  //------------- Handle Submit ------------------
  /*
  the handleSubmit function will run when the form is submitted and useState setter
   function will take the initial state and keep everything that was already there
   (prev) and only update the field that changed
  */

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("data:", formData);

    //store the users profile data by sending a POST request to the API
    storeUserData();

    //then updating the userInfo state with formData so that the welcome message will show
    setUserInfo(formData);

    //then I want to reset the form back to empty so that when page refreshes it can be filled out again potentially by someone else
    setFormData(emptyFormState);
  };

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
          {/* Mapped over savedCountries array and embedded Country card 
          // right now array has JUST saved country names, we need entire object for each country rather than just names. TO DO SO: use filtering an array with  another array: map() & find() method
          */}
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
