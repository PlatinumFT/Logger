const Discord = require("discord.js");

module.exports = async emoji => {
    let guildinfo = await emoji.client.db(`select * from guilds where guild_id = '${emoji.guild.id}'`);

    if(guildinfo[0].channel_id == '') return;
    if(guildinfo[0].emojicreate == false) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Emoji Created`, `► Name: \`${emoji.name}\`\n► Animated: **${emoji.animated}**\n► Emoji ID: ${emoji.id}`)
                    .setTimestamp()
                    .setColor(emoji.client.settings.colour)
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    let c = emoji.guild.channels.get(guildinfo[0].channel_id);
    c.send(`A new emoji was created`,{embed})
};