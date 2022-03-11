const {Client} = require('discord.js')
const fs = require('fs')
const path = require('path')

/**
 * 
 * @param {Client} client 
 */

module.exports = async(client) => {
    //
    if(fs.existsSync(`${client.menusPath}`)){
        const menuFiles = fs.readdirSync(client.menusPath).filter(f => f.endsWith('.js'))
        for(const file of menuFiles){
            const menu = require(`${path.join(client.menusPath , file)}`)
            client.menus.set(menu.name , menu)
        }
    }
}