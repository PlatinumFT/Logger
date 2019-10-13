const reqEvent = (event) => require(`../events/${event}`);
const Discord = require("discord.js");

module.exports = client => {
    client.on('ready', () => reqEvent('ready')(client));
    client.on('message', (message) => reqEvent('message')(message));
    client.on('messageDelete', (message) => reqEvent('messageDelete')(message));
    client.on('messageDeleteBulk', (messages) => reqEvent('messageDeleteBulk')(messages));
    client.on('messageUpdate', (oldMessage, newMessage) => reqEvent('messageUpdate')(oldMessage, newMessage));
    // client.on('reconnecting', () => reqEvent('ready')(client));
    // client.on('disconnected', () => reqEvent('ready')(client));
    // client.on('guildMemberAdd', (member) => reqEvent('guildMemberAdd')(member,client));
    client.on('channelCreate', (channel) => reqEvent('channelCreate')(channel));
    client.on('channelDelete', (channel) => reqEvent('channelDelete')(channel));
    client.on('channelUpdate', (oldChannel, newChannel) => reqEvent('channelUpdate')(oldChannel, newChannel));
    client.on('emojiCreate', (emoji) => reqEvent('emojiCreate')(emoji));
    client.on('emojiDelete', (emoji) => reqEvent('emojiDelete')(emoji));
    client.on('emojiUpdate', (oldEmoji, newEmoji) => reqEvent('emojiUpdate')(oldEmoji, newEmoji));
    client.on('guildBanAdd', (guild, user) => reqEvent('guildBanAdd')(guild, user));
    client.on('guildBanRemove', (guild, user) => reqEvent('guildBanRemove')(guild, user));
    client.on('roleCreate', (role) => reqEvent('roleCreate')(role));
    client.on('roleDelete', (role) => reqEvent('roleDelete')(role));
    client.on('voiceStateUpdate', (oldMember, newMember) => reqEvent('voiceStateUpdate')(oldMember, newMember));
    // client.on('messageReactionAdd', (messageReaction, user) => console.log(`${user.username}#${user.discriminator}`));
}