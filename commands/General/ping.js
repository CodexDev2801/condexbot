const Discord = require('discord.js');
var maintenance = false;
module.exports = {
    name: 'ping',
    description: 'Obtiene el ping del usuario',
    aliases: ['pi'],
    execute(message, args) {
        message.channel.send("Pinging...") //Placeholder for ping
            .then((msg) => {
                msg.edit("Ping: " + (Date.now() - msg.createdTimestamp))
            });
    }
};
