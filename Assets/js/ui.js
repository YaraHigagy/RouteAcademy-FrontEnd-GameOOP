import {Game} from './games.js';
import {GameDetails} from './details.js';



// Select elements from HTML
// var gameDetailsCard = document.querySelector();
var gamesSection = document.querySelector('#games-body')
var gameDetailsSection = document.querySelector('#game-details-body');
var awlContailer = document.querySelector('#awl-slider');

//Initialize global variables
var gamesList;
var game;



//get all games from API by category
export async function getAllGames(category) {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ffe7d669d6mshf69fb7f108d90f4p159e54jsnc2f7ca8e62af',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const games = await response.json();
        // let games = result;
        gamesList = [];
        for(let i = 0; i < games.length; i++) {
            gamesList.push(new Game(games[i].id, games[i].title, games[i].thumbnail
                , games[i].short_description, games[i].genre, games[i].platform));
        }
    } catch (error) {
        console.error(error);
    }
}

//show games' data from API in cards
export function displayAllGames() {
    var games = '';
    var desc = '';

    for(let i = 0; i < gamesList.length; i++) {
        desc = gamesList[i].short_description;

        games += `
                    <div class="col-md-6 col-lg-3 mt-4">
                        <div id="card-${gamesList[i].id}" data-id="${gamesList[i].id}" class="card h-100 text-bg-dark pointer">
                            <div class="card-body">
                                <figure>
                                    <img id="game-card-thumbnail" src="${gamesList[i].thumbnail}" class="card-img-top h-100 object-fit-cover rounded-top-2" alt="...">
                                </figure>
                                <figcaption>
                                    <div class="d-flex justify-content-between">
                                        <h3 id="game-card-title" class="card-title fs-14px">${gamesList[i].title}</h3>
                                        <span class="badge text-bg-primary p-2">Free</span>
                                    </div>
                                    <p id="game-card-desc" class="card-text fs-14px opacity-50 text-center">
                                        ${desc.slice(0, 100)
                                        }${(gamesList[i].short_description == desc.slice(0, 100))? '' : '...'}
                                    </p>
                                </figcaption>
                            </div>
                            <footer class="d-flex justify-content-between border-top py-2 px-3">
                                <span id="game-card-category" class="badge bg-sub fs-11px p-1">${gamesList[i].genre}</span>
                                <span id="game-card-platform" class="badge bg-sub fs-11px p-1">${gamesList[i].platform}</span>
                            </footer>
                        </div>
                    </div>
                `;
    }

    gamesSection.innerHTML = games;
}



//get game's details from API by id
export async function getGameDetails(id) {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ffe7d669d6mshf69fb7f108d90f4p159e54jsnc2f7ca8e62af',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const gameDetails = await response.json();
        // gameDetails = result;
        game = new GameDetails(gameDetails.id, gameDetails.title, gameDetails.thumbnail, gameDetails.status, gameDetails.description
                            , gameDetails.game_url, gameDetails.genre, gameDetails.platform, gameDetails.screenshots)
    } catch (error) {
        console.error(error);
    }
}

//show game's details from API in details section
export function displayGameDetails() {
    awlSlider();
    
    var screenshots = '';
    for(let i = 0; i < game.screenshots.length; i++) {
        screenshots += `<div><img class="w-100 img-fluid object-fit-cover" src="${game.screenshots[i].image}" alt=""></div>`
    }

    let awl = `<div class="owl-carousel">
                    ${screenshots}
                </div>`;
    awlContailer.innerHTML = awl;

    var gameDetailsContainer = `
                    <div class="col-md-4 mt-4"><img id="game-thumbnail" class="w-100 img-fluid object-fit-cover" src="${game.thumbnail}" alt=""></div>
                    <div class="col-md-8 mt-4">
                        <h3>Title: <span id="game-title">${game.title}</span></h3>
                        <p>Category: <span id="game-category" class="badge text-bg-info">${game.genre}</span></p>
                        <p>Platform: <span id="game-platform" class="badge text-bg-info">${game.platform}</span></p>
                        <p>Status: <span id="game-status" class="badge text-bg-info">${game.status}</span></p>
                        <p id="game-desc">${game.description}</p>
                        <a href="${game.game_url}" target="_blank">
                            <input type="button" role="button" class="btn btn-outline-warning text-white" value="Show Game">
                        </a>
                    </div>
                    `;

    gameDetailsSection.innerHTML = gameDetailsContainer;
}

// Awl Carousel sliders
function awlSlider() { 
    $(document).ready(function(){
        var owl = $('.owl-carousel');
        owl.owlCarousel({
            items:4,
            loop:true,
            margin:10,
            responsive:{
                0:{
                    items:1
                },      
                960:{
                    items:2
                },
            }
    });
        owl.on('mousewheel', '.owl-stage', function (e) {
            if (e.deltaY>0) {
                owl.trigger('next.owl');
            } else {
                owl.trigger('prev.owl');
            }
            e.preventDefault();
        });
    });
}