const Discord = require('discord.js');
const parent = require('../../bot.js');
var maintenance = false;
module.exports = {
	name: 'lick',
    description: 'Lame a alguien del servidor',
    cooldown: 5,
    aliases: ['l', 'lamer'],
    usage: "[usuario]",
	execute(message, args, client) {
    
        let lick = ['https://media1.tenor.com/images/4ad8cf8c99b8dd676654cabb4660781f/tenor.gif?itemid=16465150', 'https://media1.tenor.com/images/5c5828e51733c8ffe1c368f1395a03d0/tenor.gif?itemid=14231351', 'https://media1.tenor.com/images/5f73f2a7b302a3800b3613095f8a5c40/tenor.gif?itemid=10005495', 'https://media1.tenor.com/images/25239414375d304c38880d02941fffe3/tenor.gif?itemid=16930771', 'https://media1.tenor.com/images/b00d152c5645975a06c4916e360635ef/tenor.gif?itemid=15900643', 'https://media1.tenor.com/images/ec2ca0bf12d7b1a30fea702b59e5a7fa/tenor.gif?itemid=13417195', 'https://media1.tenor.com/images/6b701503b0e5ea725b0b3fdf6824d390/tenor.gif?itemid=12141727', 'https://media1.tenor.com/images/efd46743771a78e493e66b5d26cd2af1/tenor.gif?itemid=14002773', 'https://media1.tenor.com/images/faa1937f75b548bec3bb0e48061620a2/tenor.gif?itemid=15900647', 'https://media1.tenor.com/images/ea4f3cf3233664ddfa510d9cc9b2f12f/tenor.gif?itemid=15585643', 'https://media1.tenor.com/images/fc0ef2ba03d82af0cbd6c5815c3c83d5/tenor.gif?itemid=12141725', 'https://media1.tenor.com/images/3cbd13d5bd4c0a541d85d1d427c49abd/tenor.gif?itemid=16465188']
        let mathlick = lick[Math.floor(Math.random() * lick.length)];

        let personlick = message.mentions.members.first();

        let frases = ['lamer', 'probar']
        let mathfrases = frases[Math.floor(Math.random() * frases.length)];

        if(!personlick){
            let licka = 'lamer a todo el servidor!'

            let embed = new Discord.MessageEmbed()
            .setDescription(`**${message.author.username}** acaba de ${licka}`)
            .setImage(mathlick)
            .setColor("RANDOM")

            message.channel.send(embed)
            return;
        }

        if(personlick.id === message.author.id){
            let elmismo = 'a si mismo'
            let embed = new Discord.MessageEmbed()

            .setDescription(`**${message.author.username}** acaba de lamerse ${elmismo}`)
            .setImage(mathlick)
            .setColor("RANDOM")

            message.channel.send(embed)
            return;
        }

        if (personlick.id ===  parent.client.user.id) {

            message.channel.send('Creo que sería imposible besar a un bot OwO')
            return;
        }

        let embed = new Discord.MessageEmbed()
        .setDescription(`**${message.author.username}** acaba de ${mathfrases} a **${personlick.user.username}**`)
        .setImage(mathlick)
        .setColor("RANDOM")

        message.channel.send(embed)
    }
};