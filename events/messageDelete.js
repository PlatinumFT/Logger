const Discord = require("discord.js");

module.exports = async message => {
    if(message.author.bot) return;

    let guildinfo = await message.client.db(`select * from guilds where guild_id = '${message.guild.id}'`);
    console.log(guildinfo[0].channel_id)
    if(guildinfo[0].channel_id == '') return;
    if(guildinfo[0].messagedelete == false) return;

    console.log(message.content);

    let embed = new Discord.RichEmbed()
                    .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
                    .addField(`Message Deleted`, `► Content: \`${message.content}\`\n► Channel: **${message.channel.name}**\n► Message ID: ${message.id}`)
                    .setTimestamp()
                    .setColor(message.client.settings.colour)
                    .setFooter(`${message.client.user.username}#${message.client.user.discriminator}`, message.client.user.avatarURL)

    let channel = message.guild.channels.get(guildinfo[0].channel_id);
    channel.send(`A message created by **${message.author.username}#${message.author.discriminator}** was just deleted in ${message.channel}`,{embed})
};