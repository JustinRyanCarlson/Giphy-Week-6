var animals = ["pig", "horse", "snake", "cat", "dog", "fish"];


animalButtons();



$('#addAnimal').on('click', function() {
    var animalEntered = $('#animalInput').val().trim();
    animals.push(animalEntered);
    $('#animalInput').val('');
    animalButtons();

    return false;
});


$('.btn').on('click', function() {
    var animalClicked = $(this).data('animal');
    var query = 'http://api.giphy.com/v1/gifs/search?q=' + animalClicked + '&limit=10&api_key=dc6zaTOxFJmzC';

    $('#animals').empty();

    $.ajax({
        url: query,
        method: 'GET'
    }).done(function(response) {
        var results = response.data;
        console.log(response);

        for (i = 0; i < results.length; i++) {
            var newGif = $('<div class="col-sm-4">');
            var rating = results[i].rating.toUpperCase();
            var p = $('<p>').html('Rating: ' + rating);
            var img = $('<img>');

            img.attr('src', results[i].images.fixed_height_small_still.url);
            img.attr('data-still', results[i].images.fixed_height_small_still.url);
            img.attr('data-animate', results[i].images.fixed_height_small.url);
            img.attr('data-clicked', false);
            img.addClass('gif-margin');
            img.addClass('gif');

            newGif.append(p);
            newGif.append(img);
            $('#animals').append(newGif);
        }
    });
});


$(document.body).on('click', '.gif', function() {
    var clicked = $(this).attr('data-clicked');

    if (clicked === false) {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-clicked', true);
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', false);
    }
});


//
// FUNCTIONS --------------------------------------------------------------------------------------------------------------
//

function animalButtons() {
    $('#animalButtons').empty();

    for (var i = 0; i < animals.length; i++) {
        var button = $('<button>').addClass('btn btn-primary button-list');
        button.attr('data-animal', animals[i]).html(animals[i]);
        $('#animalButtons').append(button);
    }
}
