var key = "apikey=3695b132";
var link = "https://www.omdbapi.com/?";
var name;

function showCovers() {
    $('#movies').empty();
    name = $('#name').val();
    addCovers();
}

function addCovers() {
    var api = link;
    api += "s=" + name + "&page=1&" + key;
    $.ajax({
        url: api,
        success: function(answer) {
            layoutCovers(answer);
        },
        error: function() {
            console.log("Information could not be obtained");
        }
    });
}

function layoutCovers(films) {
    $.each(films.Search, function(indice, element) {
        var film = $('<div>');
        film.id = element.imdbID;
        $(film).on("click", () => searchFilm(film.id));
        $(film).attr('class', 'card col-12 col-sm-6 col-lg-3');
        var containerCover = $("<div>");
        $(containerCover).attr('id', 'imgFilm');
        var cover = $('<img>');
        if (element.Poster != "N/A")
            $(cover).attr("src", element.Poster);
        else
            $(cover).attr("src", 'assets/img/notFound.jpg');
        $(cover).attr("class", "card-img-top");
        var body = $("<div>");
        $(body).attr("class", "card-img-overlay d-flex align-items-center justify-content-center titlefilm");
        var title = $("<h5>");
        $(title).attr("class", "card-title");
        $(title).text(element.Title);
        $(containerCover).append(cover);
        $(film).append(containerCover);
        $(body).append(title);
        $(film).append(body);
        $('#movies').append(film);
    });
}

function searchFilm(id) {
    var api = link;
    api += 'i=' + id + "&" + key;
    $.ajax({
        url: api,
        success: function(answer) {
            layoutModal(answer);
        },
        error: function() {
            console.log("Could not get information");
        }
    });
}

function layoutModal(data) {
    $('#modalTitle').text(data.Title);
    if (data.Poster != "N/A")
        $('#img').attr("src", data.Poster);
    else
        $('#img').attr("src", 'assets/img/notFound.jpg');
    $('#genre').text(data.Genre);
    $('#release').text(data.Released);
    $('#director').text(data.Director);
    $('#writer').text(data.Writer);
    $('#actors').text(data.Actors);
    $('#plot').text(data.Plot);
    $('#numPuntuacion').text(data.imdbRating);
    $('#modalCenter').modal('show');
}

$('#close').on('click', function() {
    $('#modalCenter').modal('hide');
});
