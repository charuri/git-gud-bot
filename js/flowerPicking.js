import { Discord, discordBot, channelID, config } from "../bot.js";

// crush ppl but optionally be nice sometimes
export default function pickFlower(channelID) {
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
