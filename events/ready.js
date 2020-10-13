module.exports = (client, message) => {

    console.log(`Conectado en: ${client.user.tag}`);
    console.log(`client.config.prefix: ${client.config.prefix}`);

    client.user.setStatus('Available');
    client.user.setPresence({ activity: { name: "Condex v2.0" } });
    try {
        client.user.setPresence({ activity: { type: "PLAYING", name: "Condex v2.0", url: "https://www.twich.tv/soycodexxx" } });
    } catch (err) {
        console.log(err)
    }

}