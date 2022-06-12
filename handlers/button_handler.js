const { existsSync, readdirSync } = require('fs')
const { join } = require('path')

/**
 * 
 * @param {Client} client 
 */

module.exports = async(client) => {
    //
    if(fs.existsSync(`${client.buttonsPath}`)){
        const buttonFiles = fs.readdirSync(client.buttonsPath).filter(f => f.endsWith('.js'))
        for(const file of buttonFiles){
            const button = require(`${join(client.buttonsPath , file)}`)
            if(button.name){
                client.buttons.set(button.name , button)
            }
        }

        console.log(`Listening for ${client.buttons.size} buttons`)
    }
}
