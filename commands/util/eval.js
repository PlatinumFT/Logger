const Discord = require("discord.js");
const fs = require('fs');

exports.run = async (client, message, args) => {
    try {
        const code = args.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);

        await message.channel.send((evaled), {code:"xl"});
      } catch (err) {
        await message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
    
}

exports.help = {
    name: "eval",
    description: "",
    usage: "eval",
    type: "owner"
}

async function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  }