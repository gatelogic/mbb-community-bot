const xp = require('../../plugins/addXp.plugin');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const mongo = require('../../plugins/mongo');
const profileSchema = require('../../schemas/profile');

module.exports = class AddXp extends Command {
    constructor(client) {
        super(client, {
            name: 'addxp',
            group: 'xp',
            memberName: 'addxp',
            description: 'Adds XP to a user.',
            examples: ['addxp @user 100'],
            guildOnly: true,
            userPermissions: ['MANAGE_GUILD'] || ['ADMINISTRATOR'],
            args: [
                {
                    key: 'user',
                    prompt: 'Whose XP do you want to add?',
                    type: 'user',
                },
                {
                    key: 'xp',
                    prompt: 'How much XP do you want to add?',
                    type: 'integer',
                }
            ]
        })
    }

    async run(msg, { user, xp }) {
        addXp(user.id, xp, msg);
        msg.reply(`${user.tag} has been given ${xp} XP.`);
        
        // Add XP to user
        await mongo().then(async (mongoose) => {
            try {
                const result = await profileSchema.findOneAndUpdate({
                    userId,
                }, {
                    userId,
                    $inc: {
                        xp: xpToAdd
                    }
                }, {
                    upsert: true,
                    new: true,
                })
    
                let { xp, level } = result;
                const needed = getNeededXP(level);
    
                if (xp >= needed) {
                    ++level;
                    xp -= needed;
    
                    const levelUpChannel = message.guild.channels.cache.get(`740668110121730200`)
                    const embed = new MessageEmbed()
                        .setTitle('Level Up!')
                        .setColor('#57F287')
                        .setDescription(`<@${userId}> has reached level ${level}!\n\nYou now have ${xp} XP.`)
                        .setTimestamp()
                    levelUpChannel.send({ embed })
    
                    await profileSchema.updateOne({
                        userId,
                    }, {
                        level,
                        xp,
                    })
                }
            } finally {
                mongoose.connection.close();
            }
        })
    }
}