const api = require("../api");
const query = require("./query");
const discordMessage = require("../discordMessageNext");

const search = async (searchArg, type) => {
    const response = await api(query, {
        search: searchArg
    }).catch(error => console.log(error));

    /*if (response.error) {
        return response;
    }*/

    const data = response.Media;
    //console.log(data);
    const nextAir = data.nextAiringEpisode;

    if (nextAir) {
        const countdown = nextAir.timeUntilAiring;
        const episode = data.nextAiringEpisode.episode;

        function secondsToDhms() {
            seconds = Number(countdown);
            var d = Math.floor(seconds / (3600 * 24));
            var h = Math.floor((seconds % (3600 * 24)) / 3600);
            var m = Math.floor((seconds % 3600) / 60);
            var s = Math.floor(seconds % 60);

            return `${d}d ${h}h ${m}m ${s}s`;
        }

        // \`\`\` ${days}d ${hours}h ${minutes}m ${seconds}s \`\`\`

        return discordMessage({
            title: data.title.romaji,
            url: data.siteUrl,
            imageUrl: data.coverImage.large,
            description: `**Episode ${episode} airs in**\n \`\`\`${secondsToDhms()}\`\`\``
        });
    } else {
        return;
    }
};

module.exports = {
    search
};
