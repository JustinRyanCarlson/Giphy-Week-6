var animals = ["pig", "horse", "snake", "cat", "dog", "fish"];


animalButtons();


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
            var newGif = $('<div class="col-sm-3">');
            var rating = results[i].rating.toUpperCase();
            var p = $('<p>').html('Rating: ' + rating);
            var img = $('<img>');
            img.attr('src', results[i].images.fixed_height_small_still.url);

            newGif.append(p);
            newGif.append(img);
            $('#animals').append(newGif);
        }
    });
});




$('#addAnimal').on('click', function() {
    var animalEntered = $('#animalInput').val().trim();
    animals.push(animalEntered);
    $('#animalInput').val('');
    animalButtons();

    return false;
});




function animalButtons() {
    $('#animalButtons').empty();

    for (var i = 0; i < animals.length; i++) {
        var button = $('<button>').addClass('btn btn-primary button-list');
        button.attr('data-animal', animals[i]).html(animals[i]);
        $('#animalButtons').append(button);
    }
}
