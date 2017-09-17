import { discordBot, fs, users } from "../bot.js";
import { isEnabled } from "./channels.js";
import { addToBucket } from "./allowance.js";

export default function handleUsers (user, userID, channelID) {
    if (isEnabled(channelID)) {
        if (!users[userID]) {
            addUser(user, userID);
            discordBot.sendMessage({
                to: channelID,
                message: "```fix\nHello " + user + "! You have been added to the chorobot userlist!```"
            });
        }
    }
}

function addUser (user, userID) {
    users[userID] = {
        "name": user,
        "permission": 2,
        "presence": "active",
        "inactivity": 0
    };
    updateUsers();
}

export function updateUsers () {
    var updateFile = { users: users };
    fs.writeFile('./json/users.json', JSON.stringify(updateFile, null, 4), (error) => {
        /* handle error */
        if (error) {
            console.log("There has been an error updating users.json: ", error);
        }
    });
}
