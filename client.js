const Discord = require('discord.js');
const client = new Discord.Client();
      client.db = require('./util/pgsql.js');
      client.channelid = require('./util/checkChannelId');

require('./util/eventLoader')(client);

run();

async function run() {
    let res = await client.db(`select * from settings`);
    client.settings = res[0];
    client.login(client.settings.token);
    client.settings.owner_id = '166995790416314370';
}

//Schema

//create table settings(token varchar, prefix text, colour varchar(6));
//create table logging(guild_id varchar(30), enabled boolean, channel_id varchar(30), channelCreate boolean, channelDelete boolean, channelUpdate boolean, emojiCreate boolean, emojiDelete boolean, emojiUpdate boolean, guildBanAdd boolean, guildBanRemove boolean, guildMemberAdd boolean, guildMemberRemove boolean, guildMemberUpdate boolean, messageDelete boolean, messageDeleteBulk boolean, messageUpdate boolean, roleCreate boolean, roleDelete boolean, roleUpdate boolean, voiceStateUpdate boolean);
//create table logging_ignore(guild_id varchar(30), channel_id varchar(30));