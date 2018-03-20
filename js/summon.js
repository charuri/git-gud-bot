import { Discord, discordBot, channelID, config, users } from "../bot.js";
import { updateUsers } from "./users.js";

export default function summonUser(channelID, person, userID) {
    //console.log("hi test");
    var delay = 2000;
    //console.log(person);
    users[person].responded = 1;
    updateUsers();
    async function sendMsg() {
        //console.log(channelID);
        await sleep(delay);
        discordBot.sendMessage({
            to: "337716572640772097",
            message: "<@" + person + "> you are being summoned! Respond \"WHAT\" in this channel to cancel summon"
        });
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
        users[person].responded++;
        updateUsers();
    }
    async function sum() {
        while(users[person].responded != 0) {
            //console.log("3 " + false);
            await sendMsg();
        }
    }
    sum();
}

export function cancelSummon(userID) {
    users[userID].responded = 0;
    updateUsers();
}

function sleep (time) {
    console.log("sleeping for " + time);
    return new Promise((resolve) => setTimeout(resolve, time));
}