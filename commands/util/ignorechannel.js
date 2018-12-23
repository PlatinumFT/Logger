let discord = require('discord.js');

exports.run = async (client, message, args) => {
    let channel = null;
    if(args[0])
        channel = await message.guild.channels.get(args[0]) || message.guild.channels.find(c => c.name === args[0]);
    
    if(channel == null)
        return await message.channel.send(await embed(`${message.author}, this channel does not exist.`));

    let chan = await client.db(`select * from ignored where guild_id = '${message.guild.id}' and channel_id = '${channel.id}'`)

    if(chan[0]) {
        await client.db(`delete from ignored where guild_id = '${message.guild.id}' and channel_id = '${channel.id}'`);
        return await message.channel.send(await embed(`${message.author}, removed ${channel} from ignored channels.`))
    } else {
        await client.db(`insert into ignored values('${message.guild.id}','${channel.id}')`);
        return await message.channel.send(await embed(`${message.author}, added ${channel} to ignored channels.`))
    }
}

exports.help = {
    name: "ignorechannel",
    description: "Ignorers a channel",
    usage: "ignore [channel nane]",
    aliases: ['ignore']
}

async function embed(text) {
    return new discord.RichEmbed().setDescription(text).setColor('#87D7E6');
}

exports.permissions = [
    'MANAGE_CHANNELS', 'MANAGE_ROLES'
]