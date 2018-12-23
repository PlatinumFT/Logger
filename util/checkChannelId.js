module.exports = async client => {
    let guildinfo = await client.db(`select * from guilds where guild_id = '${message.guild.id}'`);
    if(guildinfo[0].channel_id == '') {
        return false;
    }

    return true;
}