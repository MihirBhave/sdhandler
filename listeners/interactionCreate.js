const {Client , Interaction} = require('discord.js')

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction
 */

module.exports = (client) => {
    let noInfoYet = true;
    client.on('interactionCreate' , async (interaction) => {
        
        if(interaction.isCommand() || interaction.isApplicationCommand()){
            if(client.slashcommands.has(interaction.commandName)){
                
                const command = client.slashcommands.get(interaction.commandName)
                const arr = command.permissions.filter(perm => !interaction.member.permissions.has(perm))

                if(arr.length == 0 || interaction.guild.ownerId === interaction.member.id){
                    const result = await command.execute({interaction : interaction , options : interaction.options , client : client , channel : interaction.channel})
                    
                    // checking if the result could be valid
                    if (["object", "string"].includes(typeof result)) {
                        try {
                            interaction.reply(result);
                        } catch (error) {
                            console.error(error);
                        }
                    } else {
                        noInfoYet ? console.log("You can actually just do return <message> instead of replying regulary") : null;
                        noInfoYet = false;
                    }
                 }
                else{
                    interaction.reply({content : 'You do not have the permission to run this command.' , ephemeral : true})
                }
            }
        }

        if(interaction.isButton()){
            if(client.buttons.has(interaction.customId)){

                const button = client.buttons.get(interaction.customId)
                button.run({interaction : interaction , client : client , channel : interaction.channel})
            }
        }
    })
}
