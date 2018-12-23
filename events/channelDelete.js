const Discord = require("discord.js");

module.exports = async channel => {
    let guildinfo = await channel.client.db(`select * from guilds where guild_id = '${channel.guild.id}'`);

    if(guildinfo[0].channel_id == '') return;
    if(guildinfo[0].channeldelete == false) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Channel Deleted`, `► Name: \`${channel.name}\`\n► Type: **${channel.type}**\n► Channel ID: ${channel.id}`)
                    .setTimestamp()
                    .setColor(channel.client.settings.colour)
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)

    let c = channel.guild.channels.get(guildinfo[0].channel_id);
    c.send(`A channel was deleted`,{embed})
};