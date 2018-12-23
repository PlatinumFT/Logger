const Discord = require("discord.js");

module.exports = async role => {
    let guildinfo = await role.client.db(`select * from guilds where guild_id = '${role.guild.id}'`);

    if(guildinfo[0].channel_id == '') return;
    if(guildinfo[0].roledelete == false) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Role Deleted`, `► Name: \`${role.name}\`\n► Role ID: ${role.id}`)
                    .setTimestamp()
                    .setColor(role.client.settings.colour)
                    .setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    let c = role.guild.channels.get(guildinfo[0].channel_id);
    c.send(`A role was deleted`,{embed})
};