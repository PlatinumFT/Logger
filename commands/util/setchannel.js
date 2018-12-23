let discord = require('discord.js');

exports.run = async (client, message, args) => {
    let channel
    if(args[0])
        channel = await message.guild.channels.get(args[0]) || message.guild.channels.find(c => c.name === args[0]);
    if(!args[0]) {
        await client.db(`update guilds set channel_id = '' where guild_id = '${message.guild.id}'`)
        return await message.channel.send(await embed(`${message.author}, removed channel.`));
    }

    if(!channel)
        return await message.channel.send(await embed(`${message.author}, this channel does not exist.`));

    await client.db(`update guilds set channel_id = '${channel.id}' where guild_id = '${message.guild.id}'`)
    return await message.channel.send(await embed(`${message.author}, updated channel to ${channel}.`))
}

exports.help = {
    name: "setchannel",
    description: "Checks the ping of the bot to the server.",
    usage: "ping",
    aliases: ['sc']
}

async function embed(text) {
    return new discord.RichEmbed().setDescription(text).setColor('#87D7E6');
}