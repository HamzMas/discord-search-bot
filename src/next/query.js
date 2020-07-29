module.exports = `
query ($search: String, $thisYear: Int = 2020, $type: MediaType = ANIME) {
    Media(search: $search, type: $type, sort:STATUS_DESC, seasonYear: $thisYear) {
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
