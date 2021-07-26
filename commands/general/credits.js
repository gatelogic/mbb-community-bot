const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class creditsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'credits',
            group: 'general',
            memberName: 'credits',
            description: 'Displays credits for the bot.',
            examples: ['credits'],
            guildOnly: false,
            throttling: {
                usages: 2,
                duration: 3
            }
        })
    }

    run(msg) {
        const embed = new MessageEmbed()
            .setTitle('Credits')
            .setColor(0x00AE86)
            .addFields(
                { name: 'Developer', value: 'GateLogic#9999' },
                { name: 'Hosting', value: 'GateLogic#9999' },
                { name: 'Thanks To', value: 'MBB and the Community!' },
                { name: 'View Code', value: 'https://github.com/gatelogic/mbb-community-bot' },
            )

        msg.reply('', { embed })
    }
}