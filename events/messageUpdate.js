const Discord = require("discord.js");

module.exports = async (oldMessage, newMessage) => {
    if(oldMessage.author.bot) return;

    let guildinfo = await oldMessage.client.db(`select * from guilds where guild_id = '${oldMessage.guild.id}'`);
    console.log(guildinfo[0].channel_id)
    if(guildinfo[0].channel_id == '') return;
    if(guildinfo[0].messageupdate == false) return;

    let embed = new Discord.RichEmbed()
                    .setAuthor(`${oldMessage.author.username}#${oldMessage.author.discriminator}`, oldMessage.author.avatarURL)
                    .addField(`Message Updated`, `► Previously: \`${oldMessage.content}\`\n► Now: \`${newMessage.content}\`\n► Channel: **${oldMessage.channel.name}**\n► Message ID: ${oldMessage.id}`)
                    .setTimestamp()
                    .setColor(oldMessage.client.settings.colour)
                    .setFooter(`${oldMessage.client.user.username}#${oldMessage.client.user.discriminator}`, oldMessage.client.user.avatarURL)

    let channel = oldMessage.guild.channels.get(guildinfo[0].channel_id);
    channel.send(`A message created by **${oldMessage.author.username}#${oldMessage.author.discriminator}** was just updated in ${oldMessage.channel}`,{embed})
};