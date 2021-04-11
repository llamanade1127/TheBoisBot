
const Discord = require("discord.js");
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"], disableEveryone: false , });
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
const fs = require('fs');
const path = require('path');
const {token} = require('./config.json')

let handlers = ['command_handler', 'event_handler']

handlers.forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});


client.login(token);