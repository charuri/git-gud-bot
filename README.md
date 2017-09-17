# git-gud-bot

A Discord bot that automates certain commands for Tatsumaki and Nadeko bot.

## Features
- endless fishing (now operating on a humanized schedule!)
- flower picking (with optional kill mode)
- sass to mentions
- spongebob mocking
- awards allowance for active users every day

## Getting Started
1. `git clone <repo>`
2. `npm i`
3. Create `credentials.json` in `json` folder:

`{"token":"<user-token>", "channelID": "<channelID>"}`

In order to get user-token, login to web discord, open up dev console, under applications tab, local storage, copy the token.

In order to get the channelID, go into your Discord settings, Appearance menu, and enable Developer Mode. You should be able to see the ID when you right-click a channel now. (having a set channel ID is mainly for choosing a designated channel to do autofishing in)

## Running the Bot
`npm start [-- -sfpkma --threshold=<float> --reset=<int> --allowance=<int>]`

### Flags
- "s": enables sassy responses to mentions
- "f": enables autofishing
- "p": enables merciful autopicking
- "k": enables kill mode (autopick 100% with less delay)
- "m": enables spongebob mocking
- "a": enables allowance

### Parameters
- "threshold": float between 0 and 1 (inclusive) representing the probability that the autopicker will fire.
- "reset": int between 0 and 23 (inclusive) representing the hour of day that the allowance list should reset and update.
- "allowance": int representing how much allowance users are rewarded for being active.
