require('dotenv').config();

const { REST, Routes, ApplicationCommandOptionType} = require('discord.js');

const commands = [
    {
        name: 'add',
        description: 'Adds different names.',
        options: [
            {
                name: 'first-name',
                description: 'The first name',
                type: ApplicationCommandOptionType.String,
                choices: [
                    { name: 'Drift', value: 'Drift' },
                    { name: 'Rodimus', value: 'Rodimus' },
                    { name: 'Bumblebee', value: 'Bumblebee' },
                ],
                required: true,
            },
            {
                name: 'second-name',
                description: 'The second name',
                type: ApplicationCommandOptionType.String,
                choices: [
                    { name: 'Ratchet', value: 'Ratchet' },
                    { name: 'Megatron', value: 'Megatron' },
                    { name: 'Starscream', value: 'Starscream' },
                ],
                required: true,
            },
        ]
    },
    {
        name: 'embed',
        description: 'Sends an Embed!',
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        );
        console.log('✅ Slash commands registered successfully.');
    } catch (error) {
        console.log(`❌ Error: ${error}`);
    }
})();