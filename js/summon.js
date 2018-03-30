import { Discord, discordBot, channelID, config, users } from "../bot.js";
import { updateUsers } from "./users.js";

function summonUser(channelID, person, senpai) {
    var delay = 2000;
    users[person].responded = 1;
    updateUsers();
    async function sendMsg() {
        if (senpai) {
            discordBot.sendMessage({
                to: "337716572640772097",
                message: "OwO <@" + person + "> senpai you are being summoned! OwO pwease respond with \"WHAT\" to cancel summon!! UwU"
            });
        }
        else {
            discordBot.sendMessage({
                to: "337716572640772097",
                message: "<@" + person + "> you are being summoned! Respond \"WHAT\" in this channel to cancel summon"
            });
        }
        await sleep(delay);
        //timeout of 50 msgs
        if (users[person].responded == 50) {
            cancelSummon(person);
            await sleep(delay);
            discordBot.sendMessage({
                to: "337716572640772097",
                message: "Summoning <@" + person + "> has timed out, reissue the command to continue summoning"
            });
            return;
        }
        
    }
    async function sum() {
        while(users[person].responded != 0) {
            users[person].responded++;
            updateUsers();
            await sendMsg();
        }
    }
    sum();
}

function cancelSummon(userID) {
    users[userID].responded = 0;
    updateUsers();
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}


export default function handleSummon(userID, channelID, message, event) {
    var person = event.d.mentions[0] ? event.d.mentions[0].id : 0;
    if (message.startsWith("$summon") && person) {
        summonUser(channelID, person, false);
    } 
    if (message.startsWith("$summonSenpai") && person) {
        summonUser(channelID, person, true);
    } 
    if (message.startsWith("$cancelSummon") && person) { //format is $cancelSummon @person
        cancelSummon(person);
    }
    if (channelID == 337716572640772097) {
        if (message == "WHAT" && users[userID.toString()].responded != 0) {
            cancelSummon(userID.toString());
        }
    }
}
        
            