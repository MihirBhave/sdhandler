const { existsSync, readdirSync } = require('fs')
const { join } = require('path')

/**
 * 
 * @param {Client} client 
 */

module.exports = async(client) => {
    //
    if(existsSync(`${client.menusPath}`)){
        const menuFiles = readdirSync(client.menusPath).filter(f => f.endsWith('.js'))
        for(const file of menuFiles){
            const menu = require(`${join(client.menusPath , file)}`)
            client.menus.set(menu.name , menu)
        }
    }
}
