require("dotenv").config();
const { Client, IntentsBitField, EmbedBuilder, ActivityType } = require("discord.js");
const eventHandler = require("./handlers/eventHandler");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent,
  ],
});

eventHandler(client);

client.login(process.env.TOKEN);
