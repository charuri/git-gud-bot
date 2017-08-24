// require
var Discord = require('discord.io');
var fs = require('fs');
var gaussian = require('gaussian');
var distribution = gaussian(0, 15);
var parseArgs = require('minimist');

// default config
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

// bots
var discordBot;
var creds = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
console.log("got credentials");

// discord client config
var discordToken = creds.token;
var channelID = creds.channelID;

// cmdline args
updateFlagParams();

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
        if (config.sassEnabled) {
            var mentions = event.d.mentions;
            mentions.forEach(function (mention) {
                // console.log(mention.username);
                if (mention.username === discordBot.username) {
                    getSassy(channelID);
                }
            });
        }

        // take their life and their dreams
        if (config.pickingEnabled) {
            if (message.endsWith("`.pick`")) {
                pickFlower(channelID);
            }
        }
    });
}

function updateFlagParams() {
    var argkeys = JSON.parse(fs.readFileSync('argkeys.json', 'utf8'));
    var args = parseArgs(process.argv, argkeys);
    console.log("got argkeys");

    config.sassEnabled = args.s;
    config.fishingEnabled = args.f;
    config.pickingEnabled = args.p;
    config.killMode = args.k;
    config.pickThreshold = args.hasOwnProperty('threshold') ? args.threshold : config.pickThreshold;

    console.log("sassy bot: " + config.sassEnabled);
    console.log("autofishing: " + config.fishingEnabled);
    console.log("autopicking: " + config.pickingEnabled);
    console.log("autopicking snipe probability: " + config.pickThreshold);
    console.log("kill mode: " + config.killMode);
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
    setTimeout(getFishy, nextInterval);

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
    var delay = (config.killMode ? 100 : 500);
    // roll, if < 8. then pick flower

    if (config.killMode || (Math.random() < config.pickThreshold)) {
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
        }, delay);
        console.log('spared flowers, this time');
    }
}
