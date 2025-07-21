require("dotenv").config();
const { Client, IntentsBitField, EmbedBuilder, ActivityType } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent,
  ],
});

let status = [
  {
    name: 'Hide and Seek',
    type: ActivityType.Playing,
  },
  {
    name: 'old man yaoi',
    type: ActivityType.Watching,
  },
  {
    name: 'hyper-pop',
    type: ActivityType.Listening,
  },
  {
    name: '🎧 lofi relax',
    type: ActivityType.Streaming,
    url: 'https://www.twitch.tv/lofigirl',
  },
]

client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is online.`);

  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 10000);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "add") {
    const name1 = interaction.options.get("first-name").value;
    const name2 = interaction.options.get("second-name").value;
    interaction.reply(`The vs is ${name1} x ${name2}`);
  }

  if (interaction.commandName === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("Embed Title")
      .setDescription("This is an embed description")
      .setColor("Random")
      .addFields(
        { name: "Field title", value: "Some random value", inline: true },
        { name: "2nd Field title", value: "Some random value", inline: true }
      )
      .setAuthor({
        name: "Lust for youth",
        iconURL:
          "https://cdn-images.dzcdn.net/images/artist/92103138529889c7c1daf07ed22b01a3/1900x1900-000000-80-0-0.jpg",
        url: "https://youtu.be/vCbUjm2I7Tw?list=RDvCbUjm2I7Tw",
      });
    interaction.reply({ embeds: [embed] });
  }
});

client.on("messageCreate", (message) => {
  if (message.content === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("Embed Title")
      .setDescription("This is an embed description")
      .setColor("Random")
      .addFields(
        { name: "Field title", value: "Some random value", inline: true },
        { name: "2nd Field title", value: "Some random value", inline: true }
      )
      .setAuthor({
        name: "Lust for youth",
        iconURL:
          "https://cdn-images.dzcdn.net/images/artist/92103138529889c7c1daf07ed22b01a3/1900x1900-000000-80-0-0.jpg",
        url: "https://youtu.be/vCbUjm2I7Tw?list=RDvCbUjm2I7Tw",
      });
    message.channel.send({ embeds: [embed] });
  }
});

client.on('interactionCreate', async (interaction) => {
  try {
    if (!interaction.isButton()) return;
    await interaction.deferReply({ ephemeral: true });

    const role = interaction.guild.roles.cache.get(interaction.customId);
    if (!role) {
      interaction.editReply({
        content: "I could't find that role",
      })
      return;
    }

    const hasRole = interaction.member.roles.cache.has(role.id);

    if (hasRole) {
      await interaction.member.roles.remove(role);
      await interaction.editReply(`The role ${role} has been removed.`);
    }

    await interaction.member.roles.add(role);
    await interaction.editReply(`The role ${role} has been added.`);
  } catch (error) {
    console.log(error);
  }
})

client.login(process.env.TOKEN);
