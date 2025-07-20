require("dotenv").config();
const { Client, IntentsBitField, EmbedBuilder, ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent,
  ],
});

const roles = [
  {
    id: "1396551263344398337",
    label: "Red",
  },
  {
    id: "1396551364787568712",
    label: "Green",
  },
  {
    id: "1396551408907583578",
    label: "Blue",
  },
];

client.on("ready", async (c) => {
  try {
    const channel = await client.channels.cache.get('1394756044713889845')
    if (!channel) return;

    const row = new ActionRowBuilder();

    roles.forEach((role) => {
        row.components.push(
            new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
        )
    })

    await channel.send({
        content: 'Claim or remove a role below',
        components: [row]    
    })
    process.exit();

  } catch (error) {
    console.log(error);
  }
});

client.login(process.env.TOKEN);