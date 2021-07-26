// Imports
const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const Statcord = require('statcord.js');
require("dotenv").config();

// Plugins
const levels = require('./plugins/levels');

// Clients
const client = new CommandoClient({
    commandPrefix: '>',
    owner: ['701561771529470074', '681063076702846989']
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ["general", "General Commands"],
        ["xp", "XP and Leveling Commands"]
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

const statcord = new Statcord.Client({
    client,
    key: process.env.STATCORD,
    postNetworkStatistics: true,
})

// Connections
client.statcord = statcord;

// Events
client.on('ready', async () => {
    // Console Logs
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Logged in as ${client.user.id}!`);

    // Status
    client.user.setActivity(`the MBB server!`, { type: "WATCHING" }).catch(console.error);

    // Load Plugins
    levels(client)
})

// Login
client.login(process.env.TOKEN);
