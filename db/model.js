const fs = require('fs')

function addNWord(guild, user, hard){
    fs.readFile('./db/guild.json', (err,data) => {
        if(err) throw err;

        let jsonData = JSON.parse(data);

        jsonData[guild]['totalNWords'] += 1;
        if(typeof jsonData[guild][user] == 'undefined'){
            jsonData[guild][user] = {
                hardR: 0,
                softR: 0
            }
        }
        
        if(hard){
            jsonData[guild][user]['hardR'] += 1
        } else{
            jsonData[guild][user]['softR'] += 1
        }

        fs.writeFile('./db/guild.json', JSON.stringify(jsonData, null ,4), (err) => {if(err) throw err;})
    })
}

function getNWords(guild, user, callback){
    fs.readFile('./db/guild.json', (err,data) => {
        if(err) throw err;

        let jsonData = JSON.parse(data);
        return callback([jsonData[guild][user]['hardR'],jsonData[guild][user]['softR']])
    })
}

function getTotal(guild, callback){
    fs.readFile('./db/guild.json', (err,data) => {
        if(err) throw err;

        let jsonData = JSON.parse(data);
        return callback(jsonData[guild]['totalNWords'])
    })
}
module.exports = {addNWord, getNWords, getTotal}