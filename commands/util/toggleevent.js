let discord = require('discord.js');

exports.run = async (client, message, args) => {
    async function embed(text) {
        return new discord.RichEmbed().setDescription(text).setColor(message.client.settings.colour);
    }
 
    let str = '';
    let guildinfo = await client.db(`select * from guilds where guild_id = '${message.guild.id}'`);
    let eventState = guildinfo[0][args[0]];

    if(!(eventState == true || eventState == false) || args[0] == 'guild_id' || args[0] == 'channel_id') 
        return message.channel.send(await embed(`${message.author}, this event doesn't exist.`));

    if(eventState == true) {
        await client.db(`update guilds set ${args[0]} = false where guild_id = '${message.guild.id}'`);
        return message.channel.send(await embed(`${message.author}, updated ${args[0]} to false.`));
    } else {
        await client.db(`update guilds set ${args[0]} = true where guild_id = '${message.guild.id}'`);
        return message.channel.send(await embed(`${message.author}, updated ${args[0]} to true.`));
    }
    
}

exports.help = {
    name: "toggleevent",
    description: "Checks the events your guild is subscribed to.",
    usage: "events",
    aliases: ['te']
}