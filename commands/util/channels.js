let discord = require('discord.js');

exports.run = async (client, message, args) => {
    async function embed(text) {
        return new discord.RichEmbed().setDescription(text).setColor(client.settings.colour).setAuthor(`Channels ignored for ${message.guild.name}`, message.guild.iconURL).setFooter(`To add/remove an channel, use _ignorechannel [channel name]`);
    }

    let str = '';
    let channels = await client.db(`select * from ignored where guild_id = '${message.guild.id}'`);
    let channel;
    for(i=0;i<channels.length;i++) {
        channel = await message.guild.channels.get(channels[i].channel_id);
        if(channel)
            str+=channel + '\n';
    }

    await message.channel.send(await embed(`${str}`));
}

exports.help = {
    name: "channels",
    description: "Checks the channels your guild is ignoring.",
    usage: "channels",
    aliases: ['c']
}

exports.permissions = [
    'MANAGE_CHANNELS', 'MANAGE_ROLES'
]