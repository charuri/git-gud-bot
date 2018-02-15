import { Discord, discordBot, channelID, config } from "../bot.js";

export default function summonUser(channelID, person) {
    console.log("test");
    var delay = 10000;
    for (var i = 0; i < 10; i++) {
        discordBot.sendMessage({
            to: channelID,
            message: person
        });
        sleep(delay).then(() => {
            return;
        });


    }
    
}

function sleep (time) {
    console.log("sleeping for " + time);
  return new Promise((resolve) => setTimeout(resolve, time));
}
