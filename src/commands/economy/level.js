const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  AttachmentBuilder
} = require("discord.js");
const { RankCardBuilder, Font } = require('canvacord');
const calculateLevelXp = require('../../utils/calculateLevelXp');
const Level = require("../../models/Level");

Font.loadDefault();

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

  callback: async (client, interaction) => {
    if (!interaction.inGuild()) {
      interaction.reply("You can only run this command inside a server.");
      return;
    }

    await interaction.deferReply();

    const mentionedUserId = interaction.options.get("target-user")?.value;
    const targetUserId = mentionedUserId || interaction.member.id;
    const targetUserObj = await interaction.guild.members.fetch(targetUserId);

    const fetchedLevel = await Level.findOne({
      userId: targetUserId,
      guildId: interaction.guild.id,
    });

    if (!fetchedLevel) {
      interaction.editReply(
        mentionedUserId
          ? `${targetUserObj.user.tag} doesn't have any levels yet. Try again when they chat a little more.`
          : "You don't have any levels yet. Chat a little more and try again."
      );
      return;
    }

    let allLevels = await Level.find({ guildId: interaction.guild.id }).select('-_id userId level xp');

    allLevels.sort((a, b) => {
        if (a.level === b.level) {
            return b.xp - a.xp;
        } else {
            return b.level - a.level;
        }
    });

    let currentRank = allLevels.findIndex((lvl) => lvl.userId === targetUserId) + 1;
    

    const rank = new RankCardBuilder()
        .setAvatar(targetUserObj.user.displayAvatarURL({ size: 256 }))
        .setRank(currentRank)
        .setLevel(fetchedLevel.level)
        .setCurrentXP(fetchedLevel.xp)
        .setRequiredXP(calculateLevelXp(fetchedLevel.level))
        .setStatus(targetUserObj.presence.status)
        .setStyles({
            progressbar: {
                track: { style: { backgroundColor: '#6d6d6dff' } },
                thumb: { style: { backgroundColor: '#E91E63 '}}
            }
        })
        .setUsername(targetUserObj.user.username)
        .setDisplayName(targetUserObj.user.discriminator);
    
    const image = await rank.build({ format: "png" });
    const attachment = new AttachmentBuilder(image, { name: 'rank.png' });

    interaction.editReply({ files: [attachment] });
  },

  name: "level",
  description: "Shows your/someone's level.",
  options: [
    {
      name: "target-user",
      description: "The user whose level you want to see.",
      type: ApplicationCommandOptionType.Mentionable,
    },
  ],
};
