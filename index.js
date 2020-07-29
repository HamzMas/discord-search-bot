require("dotenv").config();
const Discord = require("discord.js");

const character = require("./src/character");
const media = require("./src/media");
const staff = require("./src/staff");
const user = require("./src/user");
const studio = require("./src/studio");
const next = require("./src/next");
const client = new Discord.Client();

//const deleteViaReaction = require("./src/deleteViaReaction");

// Use exclamation mark as the default prefix
const prefix = process.env.PREFIX || ".";

client.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(
        `Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`
    );
});

client.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

client.on("message", async message => {
    // Ignore other bot messages
    if (message.author.bot && message.author.username != "irc") {
        return;
    }

    // Remove irc username suffix
    const messageContent = message.content.replace(/<.*> /, "");

    // Ensure the message starts with our prefix
    if (messageContent.indexOf(prefix) !== 0) {
        return;
    }

    let args = messageContent
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
    const command = args.shift().toLowerCase();
    args = args.join(" ");

    let response = null;

    switch (command) {
        case "help":
            response = help;
            break;

        case "a":
        case "anime":
            response = await media.search(args, "ANIME");
            break;

        case "m":
        case "manga":
            response = await media.search(args, "MANGA");
            break;

        case "c":
        case "character":
            response = await character.search(args);
            break;

        case "p":
        case "person":
        case "staff":
            response = await staff.search(args);
            break;

        case "s":
        case "studio":
            response = await studio.search(args);
            break;

        case "u":
        case "user":
            response = await user.search(args);
            break;

        case "n":
        case "next":
            response = await next.search(args);
            break;
        
        default:
            console.log("Error in switch")
            break;
    }

    if (response === null) return;

    if (response.error) {
        message.channel.send(response.error.message);
        return;
    }

    let replyUrl;
    if (response.author && response.author.url) {
        replyUrl = message.channel.send(`<${response.author.url}>`);
    }

    const replyEmbed = message.channel.send({
        embed: {
            ...response,
            color: 3447003
        }
    });

    /*if (command !== "help") {
        deleteViaReaction(
            message,
            await replyEmbed,
            replyUrl ? await replyUrl : replyUrl,
            client
        );
    }*/
});

const help = {
    title: "Commands",
    description: `
Search anime: .a or .anime <anime title>
Search manga: .m or .manga <manga title>
Search character: .c or .character <character name>
Search staff: .p or .person or .staff <staff name>
Search studio: .s or .studio <studio name>
Search user: .u or .user <user name>
Search episode countdown: .n or .next <anime title>`
};

client.login(process.env.BOT_TOKEN);
