const Discord = require("discord.js");

module.exports = async message => {
    if(message.author.bot) return;

    let guildinfo = await message.client.db(`select * from guilds where guild_id = '${message.guild.id}'`);

    if(guildinfo[0].channel_id == '') return;
    if(guildinfo[0].messagedelete == false) return;

    let ignorer = await message.client.db(`select * from ignored where guild_id = '${message.guild.id}' and channel_id = '${message.channel.id}'`);
    if(ignorer[0]) return;

    const entry = await message.guild.fetchAuditLogs({ type: 'MESSAGE_DELETE', limit: 1 });

    let deletedBy = '';
    if (entry) {
        const log = entry.entries.first();
        const { executor, target } = log;
        if (target.id === message.author.id) deletedBy = '\n► Deleted by: ' + executor.tag;
    }

    let embed = new Discord.RichEmbed()
                    .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
                    .addField(`Message Deleted`, `► Content: \`${message.content}\`${deletedBy}\n► Channel: **${message.channel.name}**\n► Message ID: ${message.id}`)
                    .setTimestamp()
                    .setColor(message.client.settings.colour)
                    .setFooter(`${message.client.user.username}#${message.client.user.discriminator}`, message.client.user.avatarURL)

    let channel = message.guild.channels.get(guildinfo[0].channel_id);
    channel.send(`A message created by **${message.author.username}#${message.author.discriminator}** was just deleted in ${message.channel}`,{embed})
};