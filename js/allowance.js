import { Discord, discordBot, fs, _, config, users, allowance } from "../bot.js";
import { updateUsers } from "./users.js";
import { isEnabled } from "./channels.js";
import checkPermissions from "./permissions.js";

export default function handleAllowance (userID, channelID, message) {
    if (isEnabled(channelID) && !(_.isEmpty(allowance))) {
        giveAllowance(userID, channelID);
    }

    if (message === "$resetAllowance") {
        if (checkPermissions(userID, channelID)) {
            console.log("in reset allowance");
            clearBucket();
            fillBucket();
        }
    }
}

// gives the user allowance if it's their first time messaging in the server
function giveAllowance (userID, channelID) {
    var id = userID.toString();
    if (id in allowance) {
        var sass = "*Tsk, take your damn allowance-*";
        var message = ".award " + config.allowance + " <@" + id + ">";

        discordBot.sendMessage({
            to: channelID,
            message: sass
        });
        discordBot.sendMessage({
            to: channelID,
            message: message
        });

        delete allowance[id];
        users[id].presence = "active";
        users[id].inactivity = 0;
        updateUsers();
        updateAllowance();
    }
}

// timer that resets the allowance every day at 00:00:00
export function allowanceTimer () {
    // calculate reset allowance timer
    var now = new Date();
    var nowMS = (now.getHours()*60*60 + now.getMinutes()*60 + now.getSeconds())*1000;
    var reset = config.resetTime;
    if (reset == 0){
        reset = 24;
    }
    var delay = 10000;
    if (reset) {
        var resetMS = reset*60*60*1000;
        if (nowMS > resetMS) {
            var diff = Math.abs(resetMS - nowMS);
            delay = (24*60*60*1000) - diff;
        }
        else {
            delay = (resetMS - nowMS);
        }
    }

    console.log("Next Reset in ms ", delay);
    setTimeout(resetBucket, delay);
}

function resetBucket() {
    emptyBucket();
    fillBucket();
    setTimeout(allowanceTimer, 10000);
}

function emptyBucket() {
    // go through allowance list and inactivity++ users,
    // set inactive if inactivity == 5
    // remove from allowance list one by one
    for (const key of Object.keys(allowance)) {
        // console.log(users[key]);
        if (!users[key].permission == 0) {
            users[key].inactivity = users[key].inactivity+1;
        }
        if (users[key].inactivity == 5) {
            users[key].presence = "inactive";
        }
        // console.log("removed -> ", users[key]);
        delete allowance[key];
    }
    updateUsers();
    updateAllowance();
}

// updates the user inactivity and refill allowance
function fillBucket () {
    console.log("in fillbucket");
    // go through list of users and add to allowance if presence == active.
    for (const key of Object.keys(users)) {
        // console.log(key, users[key]);
        if (users[key].presence === "active" && !users[key].permission == 0) {
            allowance[key] = users[key];
        }
    }
    // console.log("added to allowance -> ", allowance);

    updateAllowance();
}

export function addToBucket (userID) {
    if (users[userID] && !allowance[userID] && !users[userID].permission == 0) {
        allowance[userID] = users[userID];
        updateAllowance();
    }
    else {
        console.log("was unable to add to bucket");
    }

}

function clearBucket () {
    console.log("in clear bucket");
    for (const key of Object.keys(allowance)) {
        delete allowance[key];
    }
    updateAllowance();
}

function updateAllowance () {
    var updateFile = { allowance: allowance };
    fs.writeFile('./json/allowance.json', JSON.stringify(updateFile, null, 4), (error) => {
        /* handle error */
        if (error) {
            console.log("There has been an error updating allowance.json: ", error);
        }
    });
}
