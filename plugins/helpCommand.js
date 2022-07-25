const {Constants, Client, MessageEmbed} = require('discord.js')

/**
  * @async
  * @param {Client} client
  */

module.exports = {
    name: 'help',
    description: 'Shows all the commands the bot has',
    type: Constants.ApplicationCommandTypes.CHAT_INPUT,
    slash: 'both',
  category: 'server', 
    async execute ({interaction, message, client}) {
      const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Help')
      .setDescription('This is a list of all the commands the bot has')

      // Get the commands
      const commands = client.commands.entries()
      let categories = []
      let finishedCommands = []
      for (const command of commands) {
        data = command[1]
        categories.push(data.category)
        finishedCommands.push(data)
      }

      let uniqueCategories = [...new Set(categories)]
      // Find the commands in each category
      for (const category of uniqueCategories) {
        let commandsInCategory = finishedCommands.filter(command => command.category === category)
        let categoryString = ''
        for (const command of commandsInCategory) {
          categoryString += `${command.name} - ${command.description}\n`
        }
        embed.addField(category, categoryString)
      }
      if (interaction) {
        interaction.reply({embeds: [embed]})
      } else if (message) {
        message.reply({embeds: [embed]})
      }

    }
}
