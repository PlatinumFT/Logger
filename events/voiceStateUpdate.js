const Discord = require("discord.js");

module.exports = async (oldMember, newMember) => {
    let oldVoice = oldMember.voiceChannel;
    let newVoice = newMember.voiceChannel;

    if(!oldVoice) {
        let guildinfo = await newMember.client.db(`select * from guilds where guild_id = '${newMember.guild.id}'`);

        if(guildinfo[0].channel_id == '') return;
        if(guildinfo[0].voicestateupdate == false) return;

        let c = newMember.guild.channels.get(guildinfo[0].channel_id)
        let embed = new Discord.RichEmbed()

        embed.setAuthor(`${newMember.user.username}#${newMember.user.discriminator}`, newMember.user.avatarURL)
        .addField(`Joined Voice Channel`, `► Name: \`${newMember.user.username}\`\n► ID: **${newMember.user.id}**`)
        .setTimestamp()
        .setColor(newMember.client.settings.colour)
        .setFooter(`${newMember.client.user.username}#${newMember.client.user.discriminator}`, newMember.client.user.avatarURL)

        c.send(`**${oldMember.user.username}#${oldMember.user.discriminator}** has a Voice Channel.`,{embed})
    } else if (!newVoice) {
        let guildinfo = await oldMember.client.db(`select * from guilds where guild_id = '${oldMember.guild.id}'`)

        if(guildinfo[0].channel_id == '') return;
        if(guildinfo[0].voicestateupdate == false) return;

        let c = oldMember.guild.channels.get(guildinfo[0].channel_id);
        let embed = new Discord.RichEmbed()

        embed.setAuthor(`${oldMember.user.username}#${oldMember.user.discriminator}`, oldMember.user.avatarURL)
        .addField(`Left Voice Channel`, `► Name: \`${oldMember.user.username}\`\n► ID: **${oldMember.user.id}**`)
        .setTimestamp()
        .setColor(oldMember.client.settings.colour)
        .setFooter(`${oldMember.client.user.username}#${oldMember.client.user.discriminator}`, oldMember.client.user.avatarURL)

        c.send(`**${oldMember.user.username}#${oldMember.user.discriminator}** has left a Voice Channel.`,{embed})
    }
};