const Discord = require("discord.js");

module.exports = async (oldChannel, newChannel) => {
    let guildinfo = await oldChannel.client.db(`select * from guilds where guild_id = '${oldChannel.guild.id}'`);

    if(guildinfo[0].channel_id == '') return;
    if(guildinfo[0].channelupdate == false) return;

    let str = '';

    if(oldChannel.name != newChannel.name)
        str+=`► Name: \`${oldChannel.name}\` **->** \`${newChannel.name}\`\n`;

    

    let embed = new Discord.RichEmbed()
                    .addField(`Channel Updated`, `${str}► Channel ID: ${oldChannel.id}`)
                    .setTimestamp()
                    .setColor(oldChannel.client.settings.colour)
                    .setFooter(`${oldChannel.client.user.username}#${oldChannel.client.user.discriminator}`, oldChannel.client.user.avatarURL)

    let c = oldChannel.guild.channels.get(guildinfo[0].channel_id);
    c.send(`Channel ${oldChannel.name} was just updated`,{embed})
};