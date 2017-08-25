import { Discord, discordBot } from "../bot.js";

export default function mockify(message, channelID) {
    var input = message.toLowerCase();
    var output = "";
    var k = Math.floor(Math.random() * 3) + 1;

    for (var i = 0; i < input.length; i++) {

        if (k == 0) {
            output += input[i].toUpperCase();
            k = Math.floor(Math.random() * 3) + 1;
            continue;
        } else if (k > 0) {

            output += input[i];
            k--;
        }
    }

    output = "***```fix\n" + output.substr(6) + "```***";
    // var event = {d: {embeds: {}}};
    // event.d.embeds = {
    //     type: 'rich',
    //     description: output,
    //     color: 7458112
    // };

    discordBot.sendMessage({
        to: channelID,
        message: output
        // event: event
    });
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
