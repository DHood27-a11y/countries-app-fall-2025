import { useState } from "react";

//Here I created my function for Saved countries page and gave it a variable called formData and gave that a setter function I set the useState to the according info that will be needed in the form and gave each a value of an empty string given the user will provide that info when they fill it out
//next I created handleChange function that will run each time user types or changes something on the form
//the handleSubmit function will run when the form is submitted and useState setter function will take the initial stae and keep everything that was already there(prev) and only update the field that changed

//for my actual form I created a form element and passed in my handleSubmit which onSubmit will call once the form is actually submitted
//for each input the type is equal to the type of input the user will be doing, the name identifies the type of input needed, the placeholder is what will be in the input field to let the user know what they are typing, each input has a value prop that is connected to the formData which holds all the values of the form fields, onChange calls handleChange so typing is updated/tracked by each keystroke
//lastly I gave it a submit button that will store info once form is submitted
function SavedCountries() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("data:", formData);
  };

  return (
    <>
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
    </>
  );
}

export default SavedCountries;
