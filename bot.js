// require
var Discord = require('discord.io');
var fs = require('fs');
var gaussian = require('gaussian');
var distribution = gaussian(0, 15);

// bots
var discordBot;
var creds = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
console.log("got credentials");

// discord client params
var discordToken = creds.token;
var channelID = creds.channelID;

// bot uptime tracking
var startTime = new Date();

// gogogogogogo
init();

// init client
function init() {
    createDiscordBot();
}

// init discord bot
function createDiscordBot() {
    // get discord client
    console.log("initializing discord bot");
    discordBot = new Discord.Client({
        autorun: true,
        token: discordToken
    })
    console.log("-> discord bot initialized");  
    // start bot
    discordBot.on('ready', function (event) {
        console.log('-> logged in as %s - %s\n', discordBot.username, discordBot.id);
        
        // begin shitpost loop
        console.log('starting to fish');
        getFishy();
    });
    
    discordBot.on('message', function(user, userID, channelID, message, event) {
        // do nothing...
    });
}

function getRandomPause() {
    return Math.min((Math.abs(distribution.ppf(Math.random())) + 1) * 30000, 1500000) 
}

function shouldSleep() {
    var currentTime = new Date();
    console.log(currentTime.getTime() - startTime.getTime());
    // TODO: implement day/night tracking and daytime periodic sleep
}


// as stated...
function getFishy() {
    discordBot.sendMessage({
        to: channelID,
        message: "t!fish"
    });
    
    console.log('fished');
    
    var nextInterval = getRandomPause();
    setTimeout(getFishy, nextInterval);
    
    console.log("queued self to fire in " + nextInterval + "ms");
}