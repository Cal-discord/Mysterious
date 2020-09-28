module.exports = {
    name: `ping`,
    descritption: `pong!`,
    aliases: [`p`], 
    cooldown: 3, 
    execute(message) {
        return message.channel.send("Pong!")
    }
}