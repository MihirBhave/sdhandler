const { join } = require('path')
const {Client} = require('discord.js')
const mongoose = require('mongoose')
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
 * @param {String} mongoUri
 * @param {Boolean} autoHelpMenu
 */
const sdhandler = async({client , testOnly , commandsDir  , token, eventsDir , prefix , guildID , buttonsDir, mongoUri, autoHelpMenu })=> {
    let commandsPath = ''
    let eventsPath = ''
    let buttonsPath = ''
    let menusPath = ''

    if(!prefix) prefix = ["!"]
    if(!client) return console.log('Client object was not provided.')
    if(commandsDir){
        commandsPath = join(__dirname , `../../${commandsDRir}`)
    }
    else {
        commandsPath = join(__dirname , '../../commands')
    } 
    // 
    if(eventsDir){
        eventsPath = join(__dirname , `../../${eventsDir}`)
    }
    else{
        eventsPath = join(__dirname , `../../events`)
    }

    if(buttonsDir){
        buttonsPath = join(__dirname , `../../${buttonsDir}`)
    }
    else{
        buttonsPath = join(__dirname , '../../buttons' )
    }
    
    if(testOnly){
        if(!guildID) return console.log('Please specify the Guild Id for testOnly')
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
    client.mongoUri = mongoUri
    client.autoHelpMenu = autoHelpMenu

    //Handlers

    //Login to the token
    client.login(client.token)

    //Login to mongo db
    if(client.mongoUri){
        await mongoose.connect(mongoUri, {});
    }

    const handlers = ['event_handler' , 'command_handler' , 'slash_handler' , 'button_handler' , 'menu_handler']
    handlers.forEach(handler => require(`./handlers/${handler}`)(client))

    const listeners = ['messageCreate' , 'interactionCreate' ]
    listeners.forEach(listener => require(`./listeners/${listener}`)(client))
}

module.exports.sdhandler = sdhandler;

