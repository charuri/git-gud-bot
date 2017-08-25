import { Discord, discordBot, fs, config, users, bucket } from "../bot.js";

// gives the user allowance if it's their first time messaging in the server
export default function giveAllowance (userID, channelID) {
    var id = userID.toString();
    if (id in bucket) {
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

        delete bucket[id];
        users.bucket = bucket;
        users.users[id].presence = "active";
        users.users[id].inactivity = 0;
        fs.writeFile('./json/users.json', JSON.stringify(users, null, 4), (error) => { /* handle error */ });
    }
}

// timer that resets the bucket every day at 00:00:00
export function bucketTimer () {
    // calculate reset bucket timer
    var now = new Date();
    var nowMS = (now.getHours()*60*60 + now.getMinutes()*60 + now.getSeconds())*1000;
    var reset = config.resetTime;
    if (reset == 0){
        reset = 24;
    }
    var resetMS = reset*60*60*1000;
    var delay = 10000;
    if (nowMS > resetMS) {
        var diff = Math.abs(resetMS - nowMS);
        delay = (24*60*60*1000) - diff;
    }
    else {
        delay = (resetMS - nowMS);
    }

    console.log("Next Reset in ms ", delay);
    setTimeout(fillBucket, delay);
}

// updates the user inactivity and refill bucket
function fillBucket () {
    // go through bucket list and inactivity++ users,
    // set inactive if inactivity == 5
    // remove from bucket list one by one
    for (const key of Object.keys(bucket)) {
        // console.log(users.users[key]);
        users.users[key].inactivity = users.users[key].inactivity+1;
        if (users.users[key].inactivity == 5) {
            users.users[key].presence = "inactive";
        }
        console.log("removed -> ", users.users[key]);
        delete bucket[key];
    }

    // go through list of users and add to bucket if presence == active.
    for (const key of Object.keys(users.users)) {
        // console.log(key, users[key]);
        if (users.users[key].presence == "active") {
            bucket[key] = users.users[key];
        }
    }
    console.log("added to bucket -> ", bucket);

    users.bucket = bucket;
    fs.writeFile('./json/users.json', JSON.stringify(users, null, 4), (error) => { /* handle error */ });

    setTimeout(bucketTimer, 6000);
}
