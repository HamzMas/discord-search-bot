module.exports = `
query ($search: String, $type: MediaType = ANIME) {
    Media(search: $search, type: $type, sort:STATUS_DESC, status: RELEASING) {
        siteUrl
        title {
            romaji
            english
            native
            userPreferred
          }
          coverImage {
            large
        }
          nextAiringEpisode {
            airingAt
            timeUntilAiring
            episode
          }
        }
      }
    `;
