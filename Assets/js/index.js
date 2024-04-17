import {getAllGames, displayAllGames, getGameDetails, displayGameDetails} from './ui.js';

// Select elements from HTML
var homeSection = document.querySelector('#home');
var detailsSection = document.querySelector('#details');
var detailsCloseBtn = document.querySelector('#details .btn-close');
var loadingSection = document.querySelector('#loading');
var cat_list = document.querySelectorAll('#home .nav-link');
var card_list;

// Initialize global variables
var category;
var id;



// On page loading, Loading games cards for "MMORPG" category
(async function() {
    await getAllGames("MMORPG");
    displayAllGames();

    loadingSection.classList.replace('d-block', 'd-none');
    homeSection.classList.replace('d-none', 'd-block');

    getList(card_list, '#home .card');
})();

// Change request by category by click on nav links
for(let i = 0; i < cat_list.length; i++) {
    cat_list[i].addEventListener('click', async() => {
        loadingSection.classList.replace('d-none', 'd-block');

        cat_list.forEach((e) => e.classList.remove('active'));
        cat_list[i].classList.add('active');
        category = cat_list[i].getAttribute('data-value');

        await getAllGames(`${category}` || "MMORPG");
        displayAllGames();

        loadingSection.classList.replace('d-block', 'd-none');
        homeSection.classList.replace('d-none', 'd-block');

        getList(card_list, '#home .card');
    })
}

// Close details section
detailsCloseBtn.addEventListener('click', () => {
    homeSection.classList.replace('d-none', 'd-block');
    detailsSection.classList.replace('d-block', 'd-none');
})

// Get the game's id by click on the game card and generate gameDetials section
function getList(list, selector) {
    list = document.querySelectorAll(selector);
    for(let i = 0; i < list.length; i++) {
        list[i].addEventListener('click', async() => {;
            loadingSection.classList.replace('d-none', 'd-block');

            id = list[i].getAttribute('data-id');

            loadingSection.classList.replace('d-block', 'd-none');
            homeSection.classList.replace('d-block', 'd-none');
            detailsSection.classList.replace('d-none', 'd-block');

            await getGameDetails(id);
            displayGameDetails();
        })
    }
}
