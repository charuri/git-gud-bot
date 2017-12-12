import { Discord, discordBot, fs, _, config, users} from "../bot.js";

export default function badLiray (amt, channelID) {
    discordBot.sendMessage({
        to: channelID,
        message: (".take "+ amt +" <@" + 93461417851621376 + ">")
    });
    var splitUsers = ["107720430126661632", "194260124263514112", "137864364844777472", 
        "152238227225313281", "95227428992983040", "92001588930953216", "101540601438142464", 
        "124045066296623104", "93459582369660928", "93461417851621376", "57292384576221184", 
        "192516664540135425", "221759381010644992", "319339050706141184", "121315234420883456", "107751955127898112"];
    var amtNum = parseInt(amt)/splitUsers.length;
    splitUsers.forEach(function(userID) {
        discordBot.sendMessage({
            to: channelID,
            message: (".give " + amtNum + " <@" + userID + ">")
        });
    });
}