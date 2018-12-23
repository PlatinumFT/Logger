const Discord = require("discord.js");

module.exports = async (guild, user) => {
    let guildinfo = await guild.client.db(`select * from guilds where guild_id = '${guild.id}'`);

    if(guildinfo[0].channel_id == '') return;
    if(guildinfo[0].guildbanremove == false) return;

    const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_REMOVE'}).then(audit => audit.entries.first())

    let embed = new Discord.RichEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
                    .addField(`Member Unbanned`, `► Name: \`${user.username}\`\n► ID: **${user.id}**`)
                    .setTimestamp()
                    .setColor(guild.client.settings.colour)
                    .setFooter(`By ${entry.executor.username}#${entry.executor.discriminator}`, entry.executor.avatarURL)

    let channel = guild.channels.get(guildinfo[0].channel_id);
    channel.send(`User **${user.username}#${user.discriminator}** unbanned by **${entry.executor.username}#${entry.executor.discriminator}**`,{embed})
};