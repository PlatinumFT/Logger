const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    let embed = new Discord.RichEmbed()
        .setAuthor('Click here to invite the bot to your server', client.user.avatarURL, await client.generateInvite());

    message.channel.send(embed);
}

exports.help = {
    name: "invite",
    description: "Invites the bot.",
    usage: "invite",
}