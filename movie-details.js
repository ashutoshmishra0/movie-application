const API_KEY = '?api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;
const detailsPage = document.getElementById('main');

function getMovieData(id) {
    fetch(BASE_URL + '/movie/' + id +  API_KEY + '&append_to_response=credits').then(res => res.json()).then(videoData => {
        if (videoData && Object.keys(videoData).length) {
            const { poster_path, overview, title, vote_average, release_date, spoken_languages, credits: { cast } } = videoData;
            if (poster_path) {
                const imageContainer = document.createElement('div');
                const languages = spoken_languages.map((lang) => lang.english_name);
                imageContainer.innerHTML = `
                    <img src=${IMG_URL}${poster_path} class='video-img' />
                    <div class="movie-details">
                        <span>Name: ${title}</span></br>
                        <span>Vote: ${vote_average}</span></br>
                        <span>Language: ${languages.join(',')}</span></br>
                        <span>Year: ${new Date(release_date).getFullYear()}</span></br>
                    </div>
                `;
                detailsPage.appendChild(imageContainer);
            }
            if (overview) {
                const overviewContainer = document.createElement('div');
                overviewContainer.innerHTML = `
                    <h3>Overview</h3>
                    <p>${overview}</p>
                `;
                detailsPage.appendChild(overviewContainer);
            }
            if (cast && cast.length) {
                const castContainer = document.createElement('div');
                castContainer.innerHTML = `
                    <h3>Cast</h3>
                `;
                const actorContainer = document.createElement('div');
                actorContainer.className = 'actor-container';
                cast.forEach((actor) => {
                    const { name, profile_path } = actor;
                    if (profile_path) {
                        const actorEle = document.createElement('div');
                        actorEle.className = 'actor-ele';
                        actorEle.innerHTML = `
                            <img lazy=${true} src=${IMG_URL}${profile_path} class="actor-img" />
                            <p class="actor-name">${name}</p>
                        `;
                        actorContainer.appendChild(actorEle);
                    }
                });
                castContainer.appendChild(actorContainer);
                detailsPage.appendChild(castContainer);
            }
        }
    })
}
const params = new URLSearchParams(location.search);
const id = params.get('id');
getMovieData(id);
