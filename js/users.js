import { fs, users } from "../bot.js"

export function updateUsers () {
    var updateFile = { users: users };
    fs.writeFile('./json/users.json', JSON.stringify(updateFile, null, 4), (error) => {
        /* handle error */
        if (error) {
            console.log("There has been an error updating users.json: ", error);
        }
    });
}
