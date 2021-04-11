

const Discord = require('discord.js')
const data = require('../db/model')
module.exports = {
    name: "view",
    description: "view N words",
    async execute({message, args, client}) {
        if(args[0] != null){

            let user = getUserFromMention(args[0], client);
            if(!user) return;
            data.getNWords(message.guild.id, user.id, nWords => {
                let embed = new Discord.MessageEmbed()
                .setTitle('NWord bot')
                .setDescription(`User: ${user}`)
                .addField(`Hard R's: `, nWords[0], true)
                .addField(`Soft R's:`, nWords[1], true)
                .setColor('GREEN')
                
            message.reply({embed:embed})
            })

        } else{
            data.getTotal(message.guild.id, (total) => {
                let embed = new Discord.MessageEmbed()
                    .setTitle('Tota N words')
                    .setDescription(`Total server NWords: ${total}`)
                    .setColor('GREEN')
            
                message.reply({embed:embed})
            });

        }
    }
}

function getUserFromMention(mention, client) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}