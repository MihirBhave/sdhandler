const Discord = require('discord.js')
const path = require('path')
const {Client} = require('discord.js')
/**
 * @async
 * @param {Client} client
 * @param {String} testOnly
 * @param {String} commandsDir
 * @param {String} token
 * @param {String} eventsDir
 * @param {Array} prefix
 * @param {Array} guildID
 * @param {String} buttonsDir
 */
const sdhandler = async({client , testOnly , commandsDir  , token, eventsDir , prefix , guildID , buttonsDir })=> {
    let commandsPath = ''
    let eventsPath = ''
    let buttonsPath = ''
    let menusPath = ''

    if(!prefix) prefix = ["!"]
    if(!client) return console.log('Client object not provided.')
    if(commandsDir){
        commandsPath = path.join(__dirname , `../../${commandsDir}`)
    }
    else {
        commandsPath = path.join(__dirname , '../../commands')
    } 
    // 
    if(eventsDir){
        eventsPath = path.join(__dirname , `../../${eventsDir}`)
    }
    else{
        eventsPath = path.join(__dirname , `../../events`)
    }

    if(buttonsDir){
        buttonsPath = path.join(__dirname , `../../${buttonsDir}`)
    }
    else{
        buttonsPath = path.join(__dirname , '../../buttons' )
    }
    
    if(testOnly){
        if(!guildID) return console.log('Please specify the Guild Id.')
    }
    
    // Defining all the Discord Collections and Maps.
    client.slashcommands = new Map()
    client.commands = new Map()
    client.events = new Map()
    client.testOnly = testOnly
    client.token = token
    client.commandsPath = commandsPath
    client.eventsPath = eventsPath
    client.prefix = prefix
    client.guildID = guildID
    client.buttonsPath = buttonsPath
    client.menusPath = menusPath
    client.buttons = new Map()
    client.menus = new Map()

    //Handlers

    client.login(client.token)
    
    const handlers = ['event_handler' , 'command_handler' , 'slash_handler' , 'button_handler' , 'menu_handler']
    handlers.forEach(handler => {require(`./handlers/${handler}`)(client)})

    const listeners = ['messageCreate' , 'interactionCreate' ]
    listeners.forEach(listener => {require(`./listeners/${listener}`)(client)})
}

module.exports.sdhandler = sdhandler;

