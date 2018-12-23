var colors = require('colors');
var os = require('os');
module.exports = async client => {
	let settings=client.settings
    console.log(`${client.user.username} has started`.bold.magenta)
    console.log(` Users: `.bold.red + `${client.users.size}`)
    console.log(` Channels: `.bold.red + `${client.channels.size}`)
    console.log(` Guilds: `.bold.red + `${client.guilds.size}`)
    console.log(await client.generateInvite());

    require('../util/commandsLoader.js')(client); 
}