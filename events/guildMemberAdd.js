const Canvas = require('canvas')
const Discord = require('discord.js')

module.exports = async (client, message, member) => {


    const applyText = (canvas, text) => {
        const ctx = canvas.getContext('2d');
        let fontSize = 70;

        do {
            ctx.font = `${fontSize -= 10}px sans-serif`;
        } while (ctx.measureText(text).width > canvas.width - 300);

        return ctx.font;
    }

    console.log('Member Added');
    const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
    if (!channel) return console.log('El bot no pudo encontrar un "Canal de bienvenida". Asegúrese de establecer un canal de bienvenida');


    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');


    const background = await Canvas.loadImage('images/wallpaper.jpeg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);


    ctx.font = '28px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);


    ctx.font = applyText(canvas, `${member.displayName}!`);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);


    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();


    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(avatar, 25, 25, 200, 200);


    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');


    channel.send(`Bienvenido al servidor! ${member}!`, attachment);


    let role = message.guild.roles.find(r => r.name === "Private Channels");
    console.log(`Rol: ${role}`);

    member.roles.add(role).catch(console.error);
    
}