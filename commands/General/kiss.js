const Discord = require('discord.js');
const parent = require('../../bot.js');
var maintenance = false;
module.exports = {
	name: 'kiss',
    description: 'Dale un beso a alguien del servidor',
    cooldown: 5,
    aliases: ['k', 'beso'],
    usage: "[usuario]",
	execute(message, args, client) {
    
        let kiss = ['https://media1.tenor.com/images/d0cd64030f383d56e7edc54a484d4b8d/tenor.gif?itemid=17382422', 'https://media1.tenor.com/images/b8d0152fbe9ecc061f9ad7ff74533396/tenor.gif?itemid=5372258', 'https://media1.tenor.com/images/78095c007974aceb72b91aeb7ee54a71/tenor.gif?itemid=5095865', 'https://media1.tenor.com/images/621ceac89636fc46ecaf81824f9fee0e/tenor.gif?itemid=4958649', 'https://media1.tenor.com/images/ea9a07318bd8400fbfbd658e9f5ecd5d/tenor.gif?itemid=12612515', 'https://media1.tenor.com/images/d307db89f181813e0d05937b5feb4254/tenor.gif?itemid=16371489', 'https://media1.tenor.com/images/bc5e143ab33084961904240f431ca0b1/tenor.gif?itemid=9838409', 'https://media1.tenor.com/images/7fd98defeb5fd901afe6ace0dffce96e/tenor.gif?itemid=9670722', 'https://media1.tenor.com/images/ba1841e4aeb5328e41530d3289616f46/tenor.gif?itemid=14240425', 'https://media1.tenor.com/images/1306732d3351afe642c9a7f6d46f548e/tenor.gif?itemid=6155670', 'https://media1.tenor.com/images/6f455ef36a0eb011a60fad110a44ce68/tenor.gif?itemid=13658106', 'https://media1.tenor.com/images/e76e640bbbd4161345f551bb42e6eb13/tenor.gif?itemid=4829336', 'https://media1.tenor.com/images/503bb007a3c84b569153dcfaaf9df46a/tenor.gif?itemid=17382412', 'https://media1.tenor.com/images/4b5d5afd747fe053ed79317628aac106/tenor.gif?itemid=5649376']
        let mathkiss = kiss[Math.floor(Math.random() * kiss.length)];

        let personkiss = message.mentions.members.first();

        let frases = ['besar', 'darle un beso', 'robarle un beso']
        let mathfrases = frases[Math.floor(Math.random() * frases.length)];

        if(!personkiss){
            let kissa = 'besar a todo el servidor!'

            let embed = new Discord.MessageEmbed()
            .setDescription(`**${message.author.username}** acaba de ${kissa}`)
            .setImage(mathkiss)
            .setColor("RANDOM")

            message.channel.send(embed)
            return;
        }

        if(personkiss.id === message.author.id){
            let elmismo = 'a si mismo'
            let embed = new Discord.MessageEmbed()

            .setDescription(`**${message.author.username}** acaba de besarse ${elmismo}`)
            .setImage(mathkiss)
            .setColor("RANDOM")

            message.channel.send(embed)
            return;
        }

        if (personkiss.id ===  parent.client.user.id) {

            message.channel.send('Creo que sería imposible besar a un bot OwO')
            return;
        }

        let embed = new Discord.MessageEmbed()
        .setDescription(`**${message.author.username}** acaba de ${mathfrases} a **${personkiss.user.username}**`)
        .setImage(mathkiss)
        .setColor("RANDOM")

        message.channel.send(embed)
    }
};