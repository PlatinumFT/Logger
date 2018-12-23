const Discord = require("discord.js");

module.exports = async message => {
    if(message.author.bot) return;
    var client = message.client;
    var settings = client.settings;
    var prefix = settings.prefix;
   
    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);
    let command = messageArray[0];
    let isOwner = false;
    if(settings.owner_id == message.author.id) isOwner = true;

    let guildinfo = await client.db(`select * from guilds where guild_id = '${message.guild.id}'`);
    if(!guildinfo[0]) {
        await client.db(`insert into guilds values('${message.guild.id}', '', true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true)`)
    }
    
    if(!command.startsWith(prefix)) return;

    let cmd = client.commands.get(command.slice(prefix.length)) ||
    client.commands.get(client.aliases.get(command.slice(prefix.length)));

    if(!cmd) return;

    if ((cmd.help.type == 'owner' && !isOwner)) return;
    let bool = await require('../util/permsChecker.js')(cmd, message);
    if(bool || bool == true) {
        cmd.run(client, message, args)
    };
};