var animals = ["pig", "horse", "snake", "cat", "dog", "fish"];


animalButtons();



$('#addAnimal').on('click', function() {
    var animalEntered = $('#animalInput').val().trim();
    animals.push(animalEntered);
    $('#animalInput').val('');
    animalButtons();

    return false;
});


$(document.body).on('click', '.button-list', function() {
    var animalClicked = $(this).data('animal');
    var query = 'http://api.giphy.com/v1/gifs/search?q=' + animalClicked + '&limit=10&api_key=dc6zaTOxFJmzC';

    $('#animals').empty();

    $.ajax({
        url: query,
        method: 'GET'
    }).done(function(response) {
        var results = response.data;

        for (i = 0; i < results.length; i++) {
            var newGif = $('<div class="col-sm-4">');
            var rating = results[i].rating.toUpperCase();
            var p = $('<p>').html('Rating: ' + rating);
            p.addClass('text-center');
            var img = $('<img>');

            img.attr('src', results[i].images.fixed_height_small_still.url);
            img.attr('data-still', results[i].images.fixed_height_small_still.url);
            img.attr('data-animate', results[i].images.fixed_height_small.url);
            img.attr('data-clicked', false);
            //check out this panel class and see if it can be better named so i can make a traslucent block for the whole div
            img.addClass('gif-margin gif center-block panel');

            newGif.append(p);
            newGif.append(img);
            $('#animals').append(newGif);
        }
    });
});


$(document.body).on('click', '.gif', function() {
    var clicked = $(this).data('clicked');

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
