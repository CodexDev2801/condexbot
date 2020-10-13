module.exports = {
    name: 'bass',
    description: 'Ajusta el volumen del reproductor.',
    cooldown: 5,
    aliases: ['volume', 'vol'],
    execute(message, args) {


        if (args) {

            volString = args.join('')

            var volInt = parseInt(volString, 10)


            const whitelist = ["263467234817605633", "273878953356296194", "764659225300959243"]

            var isWhitelisted = whitelist.includes(message.author.id)

            if (!isNaN(volInt) && volInt >= 0) {

                if (isWhitelisted) {

                    console.log(`volInt: ${volInt}`)
                    const { channel } = message.member.voice;
                    if (!channel) return message.channel.send('Lo siento, pero debes estar en un canal de voz para reproducir música.');
                    const serverQueue = message.client.queue.get(message.guild.id);
                    if (!serverQueue) return message.channel.send('No hay nada sonando.');
                    oldVolume = serverQueue.volume
                    if (!args[0]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
                    serverQueue.volume = volInt; // eslint-disable-line
                    serverQueue.connection.dispatcher.setVolumeDecibels(volInt);
                    return message.channel.send(`El volumen se ha establecido desde **${oldVolume}** a: **${volInt}**`);

                } else {

                    return message.channel.send("Debe ser miembro de Condex Premium para utilizar esta función. Póngase en contacto con el administrador de su servidor para obtener más información")

                }
                

            } else {

                return message.channel.send("El comando de volumen solo acepta entrada numérica positiva/negativa ")

            }
            
        }
    }
};
