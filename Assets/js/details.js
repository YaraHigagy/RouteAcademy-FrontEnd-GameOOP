export class GameDetails {
    constructor(id, title, thumbnail, status, description, game_url, genre, platform, screenshots) {
        this.id = id,
        this.title = title,
        this.thumbnail = thumbnail,
        this.status = status,
        // short_description,
        this.description = description,
        this.game_url = game_url,
        this.genre = genre,
        this.platform = platform,
        // publisher,
        // developer,
        // release_date,
        // freetogame_profile_url,
        // minimum_system_requirements,
        this.screenshots = screenshots
    }

    showGame() {
        // open(this.game_url, "_blank");
    }
}