let discord = require('discord.js');

exports.run = async (client, message, args) => {
    async function embed(text) {
        return new discord.RichEmbed().setDescription(text).setColor(client.settings.colour).setAuthor(`Event configuration for ${message.guild.name}`, message.guild.iconURL).setFooter(`To update an event, use _toggleevent [event name]`);
    }

    let str = '';
    let guildinfo = await client.db(`select * from guilds where guild_id = '${message.guild.id}'`);
    Object.keys(guildinfo[0]).forEach(function(key) {
        if(key == 'guild_id') return;
        if(key == 'channel_id') {
            if(guildinfo[0].channel_id != '') {
                let channel = message.guild.channels.get(guildinfo[0].channel_id);
                if(channel)
                    str+=`**__Channel: ${channel}__**\n`;
            } else
                str+='**__Channel: None.__**\n'

            return;
        }
        str+=`${key} -> ${guildinfo[0][key]}\n`
      });
    await message.channel.send(await embed(`${str}`));
}

exports.help = {
    name: "info",
    description: "Checks the events your guild is subscribed to.",
    usage: "events",
    aliases: ['i']
}

exports.permissions = [
    'MANAGE_CHANNELS', 'MANAGE_ROLES'
]