let discord = require('discord.js');

exports.run = async (client, message, args) => {
    async function embed(text) {
        return new discord.RichEmbed().setDescription(text).setColor(client.settings.colour);
    }

    const m = await message.channel.send(await embed(`Ping?`));
    m.edit(await embed(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`));
}

exports.help = {
    name: "ping",
    description: "Checks the ping of the bot to the server.",
    usage: "ping",
    aliases: ['p']
}
