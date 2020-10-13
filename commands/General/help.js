const parent = require('../../bot.js');
const prefix = parent.client.config.prefix
const { MessageEmbed } = require('discord.js')
const colours = require('../../colours.json')
module.exports = {
    name: 'help',
    description: 'Enumere todos mis comandos o información sobre un comando específico.',
    aliases: ['comandos'],
    usage: '[command name]',
    cooldown: 5,
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {

            //GENERAL HELP DM
            HEmbed = new MessageEmbed()
                .setTitle(`Lista de comandos`)
                .setDescription(`Una lista de todos los comandos \nPuedes ocupar ${prefix}help [nombre del comando] para obtener información especifica del comando`)
                .setColor(colours.gold)
                .setThumbnail(parent.client.user.displayAvatarURL())
                .setFooter(`By Codex`, parent.client.user.displayAvatarURL())
            commands.forEach((command) => {
                HEmbed.addField(`${command.name}`, `${command.description}`, true)
            });
                
            

            return message.author.send({ split: true, embed: HEmbed })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.react('764930023584170014');
                })
                .catch(error => {
                    console.error(`No se pudo enviar ayuda DM a ${message.author.tag}.\n`, error);
                    message.reply('parece que no puedo enviarte un mensaje de texto!');
                });
        }


        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('Este no es un comando valido!');
        }

        HEmbed = new MessageEmbed()
            .setTitle(`**Ayuda en ${command.name}**`)
            .setThumbnail(message.guild.iconURL())
            .setColor(colours.gold)
            .addField(`**Nombre**`, `${command.name}`, true)
            .addField(`**Alias**`, `${command.aliases.join(', ')}`, true)
            .addField(`**Descripción**`, `${command.description}`, true)
            .addField(`**Uso:**`, `${prefix}${command.name} ${command.usage}`, true)
            .addField(`**Cooldown:**`, `${command.cooldown || 3} second(s)`, true)
            .setFooter(`By Codex`, parent.client.user.displayAvatarURL())

        message.channel.send({ split: true, embed: HEmbed });
    },
};