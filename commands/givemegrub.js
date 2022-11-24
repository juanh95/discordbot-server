const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");
require("dotenv").config();
const tomtomKey = process.env.TOMTOM_KEY;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("givemegrub")
    .setDescription("Responds with 3 dining suggestions")
    .addStringOption((option) =>
      option.setName("location").setDescription("city, state").setRequired(true)
    ),
  async execute(interaction) {
    await interaction.reply("Getting you grub options...");
    const { data: geocodeapiResponse } = await axios.get(
      `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(
        interaction.options.getString("address")
      )}.json?storeResult=false&limit=1&radius=1000&view=Unified&key=${tomtomKey}`
    );

    const resultingCoords = geocodeapiResponse.results[0].position;

    const { data: searchapiResponse } = await axios.get(
      `https://api.tomtom.com/search/2/nearbySearch/.json?lat=${resultingCoords.lat}&lon=${resultingCoords.lon}&limit=3&radius=10000&categorySet=7315&view=Unified&relatedPois=all&key=${tomtomKey}`
    );

    const places = searchapiResponse.results;

    var finalResult = [];

    places.forEach((place) => {
      let entry = place.poi.name;
      let categories = place.poi.categories.join(" ");
      entry += " (" + categories + ")";
      finalResult.push(entry);
    });

    var fin = finalResult.join("\r\n");

    await interaction.followUp(`
      Grub Options: \n ${fin}
    `);
  },
};
