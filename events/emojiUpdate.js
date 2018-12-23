const Discord = require("discord.js");

module.exports = async (oldEmoji, newEmoji) => {
    let guildinfo = await oldEmoji.client.db(`select * from guilds where guild_id = '${oldEmoji.guild.id}'`);

    if(guildinfo[0].channel_id == '') return;
    if(guildinfo[0].emojiupdate == false) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Emoji Updated`, `► Old Name: \`${oldEmoji.name}\`\n► New Name: \`${newEmoji.name}\`\n► Emoji ID: ${oldEmoji.id}`)
                    .setTimestamp()
                    .setColor(oldEmoji.client.settings.colour)
                    .setFooter(`${oldEmoji.client.user.username}#${oldEmoji.client.user.discriminator}`, oldEmoji.client.user.avatarURL)

    let c = oldEmoji.guild.channels.get(guildinfo[0].channel_id);
    c.send(`An emoji was updated ${newEmoji}`,{embed})
};