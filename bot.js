const noblox = require("noblox.js");
const express = require("express");

// Express keeps the bot alive
const app = express();
app.get("/", (req, res) => res.send("Bot is running!"));
app.listen(3000);

const ROBLOX_COOKIE = process.env.ROBLOX_COOKIE; // Securely stored in GitHub secrets

async function startBot() {
    console.log("Logging in...");
    await noblox.setCookie(ROBLOX_COOKIE);
    console.log(`Logged in as ${await noblox.getCurrentUser().UserName}`);

    // Example: Auto thank donors
    noblox.onDonation(async (donation) => {
        console.log(`Received donation: ${donation.amount} Robux`);
        await noblox.message(donation.fromUser, "Thank you for your donation!");
    });
}

startBot();
