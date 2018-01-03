let app = {
    URL: 'https://api.themoviedb.org/3/',
    INPUT: null,
    init: function () {
        //fetch the config info
        app.INPUT = document.getElementById('search-input');
        app.INPUT.focus();
        //add click listener
        let btn = document.getElementById('search-button');
        btn.addEventListener('click', app.runSearch);
        //listen for enter or return
        let bkbtn = document.getElementById('back-button');
        bkbtn.addEventListener('click', function () {
            innerHTML = "";
            location.reload();
        });
        document.addEventListener('keypress', function (ev) {
            let char = ev.char || ev.charCode || ev.which;
            if (char == 10 || char == 13) {
                //they hit <enter> or <search>
                btn.dispatchEvent(new MouseEvent('click'));
            }
        });
    },
    runSearch: function (ev) {
        ev.preventDefault(); //save you from unexpected behavior
        if (app.INPUT.value) {
            //if they actually type something other than <enter>
            let url = app.URL + "search/movie?api_key=" + KEY;
            url += "&query=" + app.INPUT.value;
            // `${app.URL}search/movie?api_key=${KEY}&query=${app.INPUT>value}`

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
//                    app.switchPages('search-results');
                    app.showMovies(data.results);

                })
                .catch(err => {
                    console.log(err);
                });
        }

    },
    showMovies: function (movies) {
        //navigate to the search results page
        let section = document.querySelector('#search-results .content');
        let df = document.createDocumentFragment();
        section.innerHTML = "";
        movies.forEach(function (movie) {
            let div = document.createElement('div');


            //console.log(movie.id);
            // div.addEventListener('click', app.getRecommended);
            div.classList.add('movie');
            let h1 = document.createElement('h1');
            h1.textContent = movie.title;
            div.appendChild(h1);

            let img = document.createElement('img');
            img.classList.add('poster');
            img.src = "https://image.tmdb.org/t/p/w185" + movie.poster_path;

            div.appendChild(img);



            let p = document.createElement('p');
            p.textContent = movie.overview;
            div.appendChild(p);

            let btn = document.createElement('button');
            btn.textContent = "Get recommended movies";
            btn.setAttribute("data-movie", movie.id);
            btn.addEventListener('click', app.getRecommended);
            div.appendChild(btn);

            // div.textContent = movie.overview;
            // add image, movie desciption etc
            df.appendChild(div);
        });
        section.appendChild(df);

    },

    getRecommended: function (ev) {
        let movie_id = ev.target.getAttribute("data-movie");
        console.log(ev.target.tagName, movie_id);

        ev.preventDefault();

        let url = app.URL + "movie/" + movie_id + "/recommendations?api_key=" + KEY;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
//                app.switchPages('recommended-results');
                app.showRecommended(data.results);
            })
            .catch(err => {
                console.log(err);
            });
    },
    switchPages: function (pageid) {
        switch (pageid) {
            case 'recommended-results':
                document.getElementById('recommended-results').classList.add('active');
                document.getElementById('search-results').classList.remove('active');
                break;
            case 'search-results':
                document.getElementById('recommended-results').classList.remove('active');
                document.getElementById('search-results').classList.add('active');
                break;
        }


    },


    showRecommended(movies) {
        //part of the url here is the movie id <- included in the movie object

console.log(movies);

//        document.getElementById('search-results').classList.remove('active');
//        document.getElementById('recommended-results').classList.add('active');
     
      let section = document.querySelector('#search-results .content');
        let df = document.createDocumentFragment();
        section.innerHTML = "";
        movies.forEach(function (movie) {
            let div = document.createElement('div');


            //console.log(movie.id);
            // div.addEventListener('click', app.getRecommended);
            div.classList.add('movie');
            let h1 = document.createElement('h1');
            h1.textContent = movie.title;
            div.appendChild(h1);

            let img = document.createElement('img');
            img.classList.add('poster');
            img.src = "https://image.tmdb.org/t/p/w185" + movie.poster_path;

            div.appendChild(img);



            let p = document.createElement('p');
            p.textContent = movie.overview;
            div.appendChild(p);
           
            df.appendChild(div);
        });
        section.appendChild(df);
}
};


document.addEventListener('DOMContentLoaded', app.init);
