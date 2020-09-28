const { execute } = require(`./newprofile`)
const db = require('quick.db')

module.exports = {
    name: "resetprofile",
    description: "Reset your player profile", 
    aliases: [`resetp`],
    cooldown: 3, 
    async execute(message) {
        const profiles = new db.table(`profiles`)

        const userProfiles = profiles.get(`profiles_${message.author.id}`)

        if (userProfiles == null) return message.channel.send("You don't have a profile")

        const msg = await message.channel.send("Are you sure you want to delete your profile?")
        await msg.react(`✅`)
        await msg.react(`❌`)

        const filter = (reaction, user) => {
            return (reaction.emoji.name == `✅` || reaction.emoji.name == `❌`) && user.id == message.author.id 
        }

        msg.awaitReactions(filter, { max: 1, time: 6000, errors: [`time`] })
            .then(reaction => {
                if (reaction.first().emoji.name == `✅`) {
                    profiles.delete(`profiles_${message.author.id}`)
                    return message.channel.send("Your profile has been reset")
                } else if (reaction.first().emoji.name == `❌`) {
                    return message.channel.send("Cancelling your profile reset")
                }
            })
            .catch(() => {
                return message.channel.send("Cancelling due to the fact that you ran out of time to respond")
               }
            
        )
    
    }
}