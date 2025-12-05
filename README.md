# 📝 Countries App 2025

## 📌 Project Description & Purpose

This project was designed for users to be able to view different countries around the world and get basic info such as: region, population, and capital. The country cards on the home page are clickable and for whichever country is clicked, it shows the countries flag as well as other according information. On the same page if the viewer refreshes, the country cards view count goes up and the user can also save the country (saving populates a confirmation message so user is aware country is actually saved).

## 🚀 Live Site

Check out the app: https://countries-app-fall-version-5.netlify.app/

## 🖼️ Screenshots

Here is where you'll include a screenshot of your project to show it off! 

Your instructor will walk you through this process with the rest of the class. Please be patient until the time comes! In the meantime, you can fill out all other sections of this template. 
1. Use `Command + Control + Shift + 4` to take a screenshot of your site and copy the screenshot to your clipboard 
2. Find your Github README.md file on the Github website
3. Edit the site by clicking on the Pencil icon ✏️
4. Move your cursor to the position where you want to paste the screenshot, then paste it. Github will convert the pasted screenshot into an `<img>` tag
5. Select "Commit changes..." to save your changes 

## ✨ Features

This is what you can do on the app: 
- You can view a countries population, region, and capital
- You can see how many times the country has been viewed
- You can save multiple countries for later viewing
- On the saved countries page you can fill out the form and your info will be stored/ a profile will be created that saves your info as well as your saved countries

## 🛠️ Tech Stack

**Frontend**

- **Languages:**   HTML, CSS, JS, React
- **Framework:**   React (JS)
- **Deployment:**   Netlify

**Server/API**

- **Languages:**  JavaScript/Node
- **Framework:**   Express
- **Deployment:**   Render

**Database**

- **Languages:**    SQL
- **Deployment:**   Neon

## 🔹 API Documentation

These are the API endpoints I built: 
1. GET /get-all-users
2. GET_/get-newest-user
3. POST /add-one-user
4. GET /get-all-saved-countries
5. POST /save-one-country
6. POST /unsave-one-country
7. POST /update-one-country-count

Learn more about the API endpoints here: _**[https://github.com/AnnieCannons/countries-app-instructions/blob/main/version-3/api-documentation.md]**_

## 🗄️ Database Schema

Here's the SQL I used to create my tables:  

```sql
Put CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  country_name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL, 
  bio VARCHAR NOT NULL
  );


INSERT INTO users (name, country_name, email, bio)
  VALUES 
  ('Jane Doe', 'USA', 'janedadoe@gmail.com', 'Love to travel!'),
  ('Ben Affleck','benbetravelin@yahoo.com','Australia','Actor'),
  ('Miranda Lambert','mirandasings@gmail.com','United Kingdom','Singer');



CREATE TABLE saved_countries (
  saved_country_id SERIAL PRIMARY KEY,
  country_name VARCHAR UNIQUE NOT NULL
  );


INSERT INTO saved_countries (country_name)
VALUES
('Japan'),
('Brazil'),
('Germany');



CREATE TABLE country_counts (
  country_count_id  SERIAL PRIMARY KEY,
  country_name VARCHAR UNIQUE NOT NULL,
  count INTEGER NOT NULL
  );


INSERT INTO country_counts (country_name, count)
VALUES
('France', 1),
('Canada', 1),
('Japan', 1);

```

## 💭 Reflections

**What I learned:**
 1. I learned how to follow/replicate the structure of a figma design
 2. I learned how to create and implement the usage of a localData.js file
 3. I learned how to set up react router in main.jsx so that I can create URL paths that load specific components within my app
 4. I learned how to fork and clone a GH repo
 5. I learned what a .gitignore file is and why its important to include in these types of projects ( Tells Git which files and folders not to track (to keep certain data private). In this instance we included it given we had config.js files that included sensitive data info from Neon database
 6. I learned why proper file/folder structure is vital when creating a larger project/app (Keeping things organized/structured allows for you to quickly find whats needed as well as can help team/coworkers quickly navigate to what they need to work on)
 7. I also learned the importance of committing as you go instead of at the very end, committing to GH as you go can help you track where a bug may have arisen from which can help cut down on debugging time. It can also allow for others to see your code process and the steps you took easier
 8. I learned how to install npm packages and how they are useful to the overall structure of your code (allows you to add useful features like confetti instead of having to code out the process from scratch)
 9. I learned how to connect data using SQL, then connecting Schema table to Neon, and then ultimately deploying to Render. 
 10. Most importantly I learned that I don't need to be afraid to fail because without failure I wouldn't be able to even comprehend what success looks like

**What I'm proud of:**  I'm proud of the fact that I was able to push past the imposter syndrome I have had since the very beginning of this assignment and the fact that I was able to set healthy boundaries with myself regarding my strengths as well as challenges. 

**What challenged me:** _Overthinking. Overthinking. Overthinking.

**Future ideas for how I'd continue building this project:** 
1. Implement the timezones for each country so a visual clock can be seen once the user clicks the country card
2. I would make the UI a lot more colorful as well as animated (for instance when the user creates a profile they would get an animation stating that their profile has been successfully created)
3. I would fix the form so that its more accessible
4. I would add an actual log in page
5. I would include top cultural events that take place in each country

