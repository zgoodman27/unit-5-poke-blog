//import modules
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const pokemon = require("./pokemon.json");

//load environmental variables
dotenv.config();

//create an instance of express
const app = express();

//.env constants
const PORT = process.env.PORT || 8080;

//set up base page
app.get("/", (req, res) => {
  res.send("App is listening.🥳");
});

//get all pokemon
app.get("/pokemon", (req, res) => {
  res.sendFile(__dirname + "/pokemon.json");
});

//get pokemon by id
app.get("/pokemon/:id", (req, res) => {
  const pokemonId = parseInt(req.params.id);
  const foundPokemon = pokemon.find((pokemon) => pokemon.id === pokemonId);

  if (foundPokemon) {
    res.json(foundPokemon);
  } else {
    res.status(404).json("Pokemon not found.");
  }
});

//set up route for new pokemon
app.post("/pokemon/new", (req, res) => {
  const newPokemon = req.body;
  try {
    console.log("New Pokemon data received:", newPokemon);
    res.status(204).json({ message: "Pokemon data received successfully." });
  } catch (error) {
    res.status(422).json({ message: "Improper input data." });
  }
});

//set up search
app.get("/pokemon/search/:name", (req, res) => {
    const searchParam = req.params.name;
    console.log(`Searching for Pokemon containing: ${searchParam}`)

    if (!searchParam) {
        return res.status(400).send("Please provide a valid search term")
    }
    //remove case sensitivity
    const searchMatches = pokemon.filter(p => p.name.toLowerCase().includes(searchParam.toLowerCase()))
    
    if (searchMatches.length > 0) {
        res.json(searchMatches)
    } else {
        res.status(404).send("No matching pokemon found")
    }
})
//listen on the specified port
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
