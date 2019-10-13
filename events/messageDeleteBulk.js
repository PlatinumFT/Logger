const Discord = require("discord.js");
var PastebinAPI = require('pastebin-js');

module.exports = async (messages, client) => {
    if(messages.first().author.bot) return;

    let guildinfo = await messages.first().client.db(`select * from guilds where guild_id = '${messages.first().guild.id}'`);

    if(guildinfo[0].channel_id == '') return;
    if(guildinfo[0].messagedeletebulk == false) return;

    let ignorer = await client.db(`select * from ignored where guild_id = '${message.first().guild.id}' and channel_id = '${message.first().channel.id}'`);
    if(ignorer[0]) return;

    str = messages.map(m => `${m.author.username}#${m.author.discriminator} (${m.author.id}) | ${m.id} | ${m.createdAt}: ${m.content}`).join('\n');

    let pastebin = new PastebinAPI({
        'api_dev_key' : 'c9da4902f0e878fbacb36c7b231fb981',
    });

    let embed = new Discord.RichEmbed()
                    .setAuthor(`${messages.first().author.username}#${messages.first().author.discriminator}`, messages.first().author.avatarURL)
                    .setTimestamp()
                    .setColor(messages.first().client.settings.colour)
                    .setFooter(`${messages.first().client.user.username}#${messages.first().client.user.discriminator}`, messages.first().client.user.avatarURL)
                    
    pastebin.createPaste(str, `A message purge just happened in ${messages.first().channel}`)
        .then(function (data) {
                let channel = messages.first().guild.channels.get(guildinfo[0].channel_id);
                embed.addField(`Multiple Messages Deleted`, `► Channel: **${messages.first().channel.name}**\n► Messages: [Here](${data})`);
                return channel.send(`A message purge just happened in ${messages.first().channel}`,{embed});
        })
        .fail(function (err) {
            console.err(err)
        });

};