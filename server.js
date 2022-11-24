const axios = require("axios");
const express = require("express");
const app = express();

require("dotenv").config();
const tomtomKey = process.env.TOMTOM_KEY;

const port = 3000;

app.get("/getLocations", async (req, res) => {
  var coords;

  try {
    console.log("Attempting to get coordinates...");

    const getCoorindatesResponse = await axios.get(
      `https://api.tomtom.com/search/2/geocode/austin%20tx.json?storeResult=false&view=Unified&key=${tomtomKey}`
    );

    coords = getCoorindatesResponse.data.results[0].position;

    console.log(`The coords are: ${coords.lat} and ${coords.lon}`);
  } catch (error) {
    console.log("Failed to get coordinates");
    console.log(error);
  }

  try {
    console.log(`Getting places...for ${coords.lat} and ${coords.lon}`);

    const { data: response } = await axios.get(
      `https://api.tomtom.com/search/2/nearbySearch/.json?lat=${coords.lat}&lon=${coords.lon}&limit=3&radius=10000&categorySet=7315&view=Unified&relatedPois=all&key=${tomtomKey}`
    );

    //console.log(places.results); //results is an array

    const places = response.results;

    var finalResult = [];

    places.forEach((place) => {
      let entry = place.poi.name;
      let categories = place.poi.categories.join(" ");
      entry += "(" + categories + ")";
      finalResult.push(entry);
    });

    var fin = finalResult.join("<br>");

    res.send(fin);
  } catch (error) {
    console.log("Unable to call to places");
    console.log(error);
  }

  res.send("completed");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
