/* --------------------------------
Server/API for Countries App Version 4

DB Fiddle Link: https://www.db-fiddle.com/f/rtajZVUpzxwZ6amdc1HBGw/75______________
----------------------------------*/

/*----------------------------------
Boilerplate Code to Set Up Server
----------------------------------*/
//WHEN YOU ARE RUNNING THINGS IN THINGS IN CONSOLE MAKE SURE YOU ARE IN SRC FOLDER THEN DO NODE INDEX.JS

//THE ONLY THING THAT WILL BE DIFFERENT WHEN WE CREATED DATA WILL BE DATABASE URL BUT THE BOILERPLATE BELOW WILL BE EXACTLY THE SAME
//importing Node Modules
import express from "express";
import pg from "pg"; //pg stands for PostgreSQL, which we need to connect to the database

// new pg.Pool() is connecting to our PostgreSQL database, or db for short
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true, // use SSL encryption when connecting to the database
});

const app = express(); //create an instance of the Express module, which gives access to Express in its entirety.

app.use(express.json()); //This server will receive and respond to requests with JSON data

const port = 3000; //Setting which port for app to listen to and receive requests

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});
/*----------------------------------
Helper Functions
----------------------------------*/
//1. getAllUsers()
//will show all current users in database
async function getAllUsers() {
  //db query() lets us query the SQL database and takes in one parameter: a SQL query
  const data = await db.query("SELECT * FROM users ORDER BY user_id ASC");
  console.log(data.rows);
  return data.rows; //we have to use dot notation to get the value of the rows property from the data object
}

//2. getNewestUser()
//will get most recently added user based on descending order and highest user_id
async function getNewestUser() {
  const data = await db.query(
    "SELECT * FROM users ORDER BY user_id DESC LIMIT 1"
  );
  return data.rows;
}

//3. addOneUser()
async function addOneUser(name, country_name, email, bio) {
  //this await function will take in 2 params: SQL command AND array that contaons dynamic values that we injected into SQL command; will be using placeholders
  await db.query(
    "INSERT INTO users (name, country_name, email, bio) VALUES ($1, $2, $3, $4)",
    [name, country_name, email, bio]
  );
}

//------- SAVED COUNTRIES -------- //
//1.getAllSavedCountries()
//retrieves all saved countries from the database
async function getAllSavedCountries() {
  //db.query() lets us query the SQL database
  const data = await db.query(
    "SELECT * FROM saved_countries ORDER BY country_name ASC"
  );
  console.log(data.rows);

  return data.rows;
}

//2. saveOneCountry(country_name)
//adds a new saved country to the database, ignores duplicates
async function saveOneCountry(country_name) {
  await db.query(
    "INSERT INTO saved_countries (country_name) VALUES ($1) ON CONFLICT (country_name) DO NOTHING",
    [country_name]
  );
}

//3. unsaveOneCountry(country_name)
//removes saved country from database
async function unsaveOneCountry(country_name) {
  await db.query("DELETE FROM saved_countries WHERE country_name = $1", [
    country_name,
  ]);
}

//------ COUNTRY COUNTS --------//

//1. updateCountryCount(country_name)
//this will update country count number according to amount of times country is viewed
async function updateCountryCount(country_name) {
  const data = await db.query(
    "INSERT INTO country_counts (country_name, count) VALUES ($1, 1) ON CONFLICT (country_name) DO UPDATE SET count = country_counts.count + 1 RETURNING *",
    [country_name]
  );
  return data.rows[0];
}

/*----------------------------------
API Endpoints
----------------------------------*/
//1. GET /get-all-users

//get method retrieves data from end[oint, we then use async await to wait for request to process data and then we get our response
app.get("/get-all-users", async (req, res) => {
  const allUsers = await getAllUsers(); //call helper function to get all users back from database

  res.json(allUsers); //send data back as JSON
});

//2. GET get-newest-user
//shows newest user that was added
app.get("/get-newest-user", async (req, res) => {
  const newestUser = await getNewestUser();
  res.json(newestUser);
});

//3. POST add-one-user
app.post("/add-one-user", async (req, res) => {
  //we use destructuring to access whatever was sent in request body and save it in variable
  const { name, country_name, email, bio } = req.body;

  //here we are not creating variable because the helper function is not getting data that needs to be returned(response should be success message)
  //the await will be end result with destructuring
  await addOneUser(name, country_name, email, bio);

  //Here the response should be a success message so we use res.send() to send text as response rather than object
  res.send(`Sucess! User was added.`);
});

//------- SAVED COUNTRIES -------- //

//1. GET /get-all-saved-countries
//shows all saved countries as data object
app.get("/get-all-saved-countries", async (req, res) => {
  const allSavedCountries = await getAllSavedCountries(); //calls helper function
  res.json(allSavedCountries); //sends data back as JSON
});
//2. POST /save-one-country
//shows message that country was saved
app.post("/save-one-country", async (req, res) => {
  const { country_name } = req.body;
  await saveOneCountry(country_name);
  res.send(`Success! ${country_name} was saved.`);
});
//3. POST /unsave-one-country
//shows success message that saved country was removed from database

app.post("/unsave-one-country", async (req, res) => {
  const { country_name } = req.body;
  await unsaveOneCountry(country_name);
  res.send(`Success! ${country_name} was unsaved.`);
});

//------ COUNTRY COUNTS --------//

//1.) POST /update-one-country-count
//shows updated count for one/selected country
app.post("/update-one-country-count", async (req, res) => {
  const { country_name } = req.body;
  const updatedCount = await updateCountryCount(country_name);
  res.json(updatedCount);
});
