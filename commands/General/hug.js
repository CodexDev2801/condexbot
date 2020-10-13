const Discord = require('discord.js');
const parent = require('../../bot.js');
var maintenance = false;
module.exports = {
	name: 'hug',
    description: 'Dale un abrazo a alguien del servidor',
    cooldown: 5,
    aliases: ['h', 'abrazo'],
    usage: "[usuario]",
	execute(message, args, client) {
    
        let hug = ['https://media1.tenor.com/images/4db088cfc73a5ee19968fda53be6b446/tenor.gif?itemid=14637016', 'https://media1.tenor.com/images/78d3f21a608a4ff0c8a09ec12ffe763d/tenor.gif?itemid=16509980', 'https://media1.tenor.com/images/5ccc34d0e6f1dccba5b1c13f8539db77/tenor.gif?itemid=17694740', 'https://media1.tenor.com/images/94989f6312726739893d41231942bb1b/tenor.gif?itemid=14106856', 'https://media1.tenor.com/images/5845f40e535e00e753c7931dd77e4896/tenor.gif?itemid=9920978', 'https://media1.tenor.com/images/e9d7da26f8b2adbb8aa99cfd48c58c3e/tenor.gif?itemid=14721541', 'https://media1.tenor.com/images/1069921ddcf38ff722125c8f65401c28/tenor.gif?itemid=11074788', 'https://media1.tenor.com/images/4d89d7f963b41a416ec8a55230dab31b/tenor.gif?itemid=5166500', 'https://media1.tenor.com/images/6db54c4d6dad5f1f2863d878cfb2d8df/tenor.gif?itemid=7324587', 'https://media1.tenor.com/images/daffa3b7992a08767168614178cce7d6/tenor.gif?itemid=15249774', 'https://media1.tenor.com/images/969f0f462e4b7350da543f0231ba94cb/tenor.gif?itemid=14246498', 'https://media1.tenor.com/images/b77fd0cfd95f89f967be0a5ebb3b6c6a/tenor.gif?itemid=7864716', 'https://media1.tenor.com/images/18474dc6afa97cef50ad53cf84e37d08/tenor.gif?itemid=12375072', 'https://media1.tenor.com/images/c7efda563983124a76d319813155bd8e/tenor.gif?itemid=15900664', 'https://media1.tenor.com/images/228cc8397577141822195070c88f6083/tenor.gif?itemid=4977890']
        let mathhug = hug[Math.floor(Math.random() * hug.length)];

        let personhug = message.mentions.members.first();

        let frases = ['darle un calido abrazo', 'abrazar', 'robarle un abrazo']
        let mathfrases = frases[Math.floor(Math.random() * frases.length)];

        if(!personhug){
            let huga = 'darle un abrazo a todo el servidor'

            let embed = new Discord.MessageEmbed()
            .setDescription(`**${message.author.username}** acaba de ${huga}`)
            .setImage(mathhug)
            .setColor("RANDOM")

            message.channel.send(embed)
            return;
        }

        if(personhug.id === message.author.id){
            let elmismo = 'a si mismo'
            let embed = new Discord.MessageEmbed()

            .setDescription(`**${message.author.username}** acaba de darse un abrazo ${elmismo}`)
            .setImage(mathhug)
            .setColor("RANDOM")

            message.channel.send(embed)
            return;
        }

        if (personhug.id ===  parent.client.user.id) {

            message.channel.send('Creo que sería imposible abrazar a un bot OwO')
            return;
        }

        let embed = new Discord.MessageEmbed()
        .setDescription(`**${message.author.username}** acaba de ${mathfrases} a **${personhug.user.username}**`)
        .setImage(mathhug)
        .setColor("RANDOM")

        message.channel.send(embed)
    }
};