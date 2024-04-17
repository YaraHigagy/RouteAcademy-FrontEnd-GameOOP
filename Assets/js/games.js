// import {Game} from './details.js';

export class Game {
    constructor(id, title, thumbnail, short_description, genre, platform) {
        this.id = id,
        this.title = title,
        this.thumbnail = thumbnail,
        this.short_description = short_description,
        // game_url,
        this.genre = genre,
        this.platform = platform
        // publisher,
        // developer,
        // release_date,
        // freetogame_profile_url
    }
}

// export class Games {
//     constructor() {
//         this.games = [];
//     }

//     newGame(id, title, thumbnail, game_url, genre, platform) {
//         let game = new Game(id, title, thumbnail, game_url, genre, platform);
//         this.games.push(game);
//         return game;
//     }

//     get allGames() {
//         return this.games;
//     }

//     get numberOfGames() {
//         return this.games.length;
//     }

//     // shortDesc() {
//     //     return this.short_description.slice(0, 30);
//     // }
// }