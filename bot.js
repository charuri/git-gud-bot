// require
var Discord = require('discord.io');
var fs = require('fs');
var gaussian = require('gaussian');
var distribution = gaussian(0, 15);
var parseArgs = require('minimist');

// default params
params = {
    sassEnabled: false,
    fishingEnabled: true,
    pickingEnabled: false,
    pickThreshold: 0.5,
    killMode: false
};

// bots
var discordBot;
var creds = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
console.log("got credentials");

// discord client params
var discordToken = creds.token;
var channelID = creds.channelID;

var argkeys = {
    "string": ["threshold"],
    "boolean": ["s", "f", "p", "k"]
};
var args = parseArgs(process.argv, argkeys);
params.sassEnabled = args.s;
params.fishingEnabled = args.f;
params.pickingEnabled = args.p;
params.pickThreshold = args.hasOwnProperty('threshold') ? args.threshold : params.pickThreshold;
params.killMode = args.k;

console.log("sassy bot: " + params.sassEnabled);
console.log("autofishing: " + params.fishingEnabled);
console.log("autopicking: " + params.pickingEnabled);
console.log("autopicking snipe probability: " + params.pickThreshold);
console.log("kill mode: " + params.killMode);

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

        // begin fishing
        console.log('starting to fish');
        getFishy();
        startMessageWatchers();
    });
}

// start message watchers
function startMessageWatchers() {
    discordBot.on('message', function(user, userID, channelID, message, event) {
        // logging
        // console.log("user ", user);
        // console.log("userID ", userID);
        // console.log("channelID ", channelID);
        // console.log("message ", message);
        // console.log("event mentions ", event.d.mentions);
        // console.log("event embeds" , event.d.embeds);
        // console.log("\n");

        // sass when ppl mention user
        if (params.sassEnabled) {
            var mentions = event.d.mentions;
            mentions.forEach(function (mention) {
                // console.log(mention.username);
                if (mention.username === client.username) {
                    getSassy(channelID);
                }
            });
        }

        // take their life and their dreams
        if (params.pickingEnabled) {
            if (message.startsWith(".plant") || message.startsWith("5 random")) {
                pickFlower(channelID);
            }
        }
    });
}

function getRandomPause() {
    return Math.min((Math.abs(distribution.ppf(Math.random())) + 1) * 30000, 1500000)
}

// for the "humans"
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
    setTimeout(getFishy, nextInterval*2);

    console.log("queued self to fire in " + nextInterval + "ms");
}

// heck
function getSassy(channelID) {
    discordBot.sendMessage({
        to: channelID,
        message: "no."
    });
    console.log("sassed");
}

// crush ppl but optionally be nice sometimes
function pickFlower(channelID) {
    var delay = (params.killMode ? 300 : 500);
    // roll, if < 8. then pick flower
    if (params.killMode || (Math.random() < threshold)) {
        setTimeout(function(){
            // console.log('delay');
            discordBot.sendMessage({
                to: channelID,
                message: ".pick"
            });
        }, delay);
        console.log('sniped flowers');
    }
    else {
        setTimeout(function(){
            // console.log('delay');
            discordBot.sendMessage({
                to: channelID,
                message: ".pink"
            });
        }, rate);
        console.log('spared flowers, this time');
    }
}
