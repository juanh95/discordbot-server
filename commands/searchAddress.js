const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");
require("dotenv").config();
const tomtomKey = process.env.TOMTOM_KEY;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("searchaddy")
    .setDescription("Replies with with lat and lon for address!")
    .addStringOption((option) =>
      option
        .setName("address")
        .setDescription("address to search")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.reply("Getting lat and lon!");
    const { data: response } = await axios.get(
      `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(
        interaction.options.getString("address")
      )}.json?storeResult=false&limit=1&radius=1000&view=Unified&key=${tomtomKey}`
    );
    const resultCityState = `${response.results[0].address.localName}, ${response.results[0].address.countrySubdivision}`
    const resultingCoords = response.results[0].position
    await interaction.followUp(`
        the co-ords for ${interaction.options.getString("address")} are: found in ${resultCityState}: ${resultingCoords.lat}, ${resultingCoords.lon}
    `);
  },
};
