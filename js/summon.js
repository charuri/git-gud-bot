import { Discord, discordBot, channelID, config, responded } from "../bot.js";

export default function summonUser(channelID, person) {
    console.log("test");
    var delay = 2000;
    async function sendMsg() {
        await sleep(delay);
        discordBot.sendMessage({
            to: channelID,
            message: "<@" + person + ">"
        });
    }
    async function sum() {
        while(!responded.get(person)) {
            console.log("3" + responded.get(person));
            await sendMsg();
        }
    }
    sum();
}

function sleep (time) {
    console.log("sleeping for " + time);
  return new Promise((resolve) => setTimeout(resolve, time));
}
