module.exports = {
    name: 'help',
    descriptions: 'Shows all the commands the bot has',
    type: Constants.ApplicationCommandTypes.CHAT_INPUT,
    slash: 'both',
    async execute ({interaction, messsage}) {
        const commands = client.commands.entries()

        for (const command of commands) {
            const data = command[1]

            embed.addField(data.name, data.description)
        }

        const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Help")
        .setDescription('Here are all the commands you can use!')
        if (interaction) {
            embed.setFooter(interaction.client.user.tag)
            interaction.reply({ embeds: [embed], ephemeral: true, })
        } else if (message) {
            embed.setFooter(messsage.client.user.tag)
            message.reply( { embeds: [embed], ephemeral: true, })
        }
    }
}