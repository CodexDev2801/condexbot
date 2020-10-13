const Discord = require('discord.js')

module.exports = async (client, message) => {

    const cooldowns = new Discord.Collection();

    //If message doesnt start with prefix or is a bot message
    if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;

    //Splits args and command
    const args = message.content.slice(client.config.prefix.length).split(' ');
    const commandName = args.shift().toLowerCase();

    //Stores command from the commands folder
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    //If command doesnt exist then returns
    if (!command) return;

    //Checks if args were entered
    if (command.args && !args.length) {
        let reply = `No proporcionaste ningún argumento, ${message.author}!`;

        if (command.usage) {
            reply += `\nEl uso adecuado sería: \`${client.config.prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }


    //Cooldowns
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }


    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 30) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            message.reply(`por favor espera ${timeLeft.toFixed(1)} más antes de ocupar el \`${command.name}\` comando.`)
                .then(msg => {
                    msg.delete({ timeout: timeLeft.toFixed(1) })
                })
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


    //Attempts the execution of the command and catches any runtime errors.
    try {
        command.execute(message, args);
    } catch (error) {
        console.log(error);

        let embed = new Discord.MessageEmbed()
        .setTitle("ERROR 404")
        .setDescription(`<:vError:764923074322628708> Ha ocurrido un error al ejecutar el comando <:vError:764923074322628708>`)

        message.reply(embed);
    }
}