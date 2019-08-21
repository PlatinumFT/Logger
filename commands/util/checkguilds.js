var PastebinAPI = require('pastebin-js');

exports.run = async (client, message, args) => {
    let pastebin = new PastebinAPI({
        'api_dev_key' : 'c9da4902f0e878fbacb36c7b231fb981',
    });

    let str = ""
    client.guilds.forEach(e => {
        str+=`${e.name} - ${e.id}\n`;
    });

    pastebin.createPaste(str, `**Guilds that I am currently in:** ${client.guilds.size}`)
    .then(async function (data) {
        await message.channel.send(data);
    })
}

exports.help = {
    name: "checkguilds",
    description: "Checks the guilds that I am in.",
    usage: "checkguilds",
    type: "owner"    
}

