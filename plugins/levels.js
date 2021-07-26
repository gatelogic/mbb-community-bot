const mongo = require('./mongo');
const profileSchema = require('../schemas/profile');
const { MessageEmbed } = require('discord.js');
module.exports = (client) => {
    client.on('message', message => {
        const { member } = message;

        if (message.author.bot) return;
        addXP(member.id, 5, message);
    })
}

const getNeededXP = level => level * level * 100    // XP needed to reach next level

const addXP = async (userId, xpToAdd, message) => {
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

module.exports.addXP = addXP;