import { Discord, discordBot, channelID, config } from "../bot.js";

export default function summonUser(channelID, person) {
    console.log("test");
    var delay = 5000;
    for (var i = 0; i < 10; i++) {
        discordBot.sendMessage({
            to: channelID,
            message: person
        });
        setTimeout(function(){return;}, delay);
        

    }
    
}
