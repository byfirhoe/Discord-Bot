const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports =  {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    
    callback: async (client, interaction) => {
        const targetUserId = interaction.options.get('target-user').value;
        const reason = interaction.options.get('reason')?.value || "No reason provided";

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(targetUserId);
        
        if (!targetUser) {
            await interaction.editReply("That user doesn't exist in this server.");
            return;
        }

        if (targetUser.id === interaction.guild.ownerId) {
            await interaction.editReply("You can't kick that user because they're the server owner.");
            return;
        }

        const targetUserRolePosition = targetUser.roles.highest.position; // Highest role of the target user.
        const requestUserRolePosition = interaction.member.roles.highest.position; // Highest role of the user running the cmd.
        const botRolePosition = interaction.guild.members.me.roles.highest.position; // Highest role of the bots

        if (targetUserRolePosition >= requestUserRolePosition) {
            await interaction.editReply("You can't kick that user because they have the same/higher role than you.");
            return;
        }
        
        if (targetUserRolePosition >= botRolePosition) {
            await interaction.editReply("I can't kick that user because they have the same/higher role than ne.");
            return; 
        }

        // Ban the target
        
        try {
            await targetUser.kick({ reason });
            await interaction.editReply(`User ${targetUser} was kicked\nReason: ${reason}`);
        } catch (error) {
            console.log(`There was an error when kicking: ${error}`)
        }
    },

    
    //deleted: true,
    name: 'kick',
    description: 'Kicks a member from this server.',
    //devOnly: Boolean,
    //testOnly: Boolean,
    options: [
        {
        name: 'target-user',
        description: 'The user you want to kick',
        required: true,
        type: ApplicationCommandOptionType.Mentionable,
        },
        {
        name: 'reason',
        description: 'The reason for kicking',
        type: ApplicationCommandOptionType.String,
        },

],

permissionsRequired: [PermissionFlagsBits.KickMembers],
botPermissions: [PermissionFlagsBits.KickMembers], 
};