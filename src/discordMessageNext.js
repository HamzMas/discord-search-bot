const TurndownService = require("turndown");
const turndownService = new TurndownService();

const pipe = (op1, op2) => arg => op2(op1(arg));

const shorten = str => {
    const markdown = turndownService.turndown(str);
    if (markdown.length > 400) {
        return markdown.substring(0, 400) + "...";
    } else {
        return markdown;
    }
};

const discordMessageNext = ({
    name,
    url,
    imageUrl,
    description,
    footer,
    title
} = {}) => {
    return {
        title: title,
        url: url,
        thumbnail: {
            url: imageUrl
        },
        description: description,
        footer: {
            text: footer
        }
    };
};

module.exports = discordMessageNext;
