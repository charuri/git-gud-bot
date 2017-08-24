# git-gud-bot

A Discord bot that automates certain commands for Tatsumaki and Nadeko bot.

## Features
- endless fishing (now operating on a humanized schedule!)
- flower picking (with optional kill mode)
- sass to mentions

## Getting Started
1. `git clone <repo>`
2. `npm i`
3. Create `credentials.json` in root folder with format 

`{"token":"<user-token>", "channelID": "<channelID>"}`

In order to get user-token, login to web discord, open up dev console, under applications tab, local storage, copy the token.
In order to get the channelID, go into your Discord settings, Appearance menu, and enable Developer Mode. You should be able to see the ID when you right-click a channel now.

## Running the Bot
`npm start [-- -sfpk --threshold=<float>]`

### Flags
- "s": enables sassy responses to mentions
- "f": enables autofishing
- "p": enables merciful autopicking
- "k": enables kill mode (autopick 100% with less delay)

### Parameters
- "threshold": float between 0 and 1 (inclusive) representing the probability that the autopicker will fire.
