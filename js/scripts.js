var url = 'https://restcountries.eu/rest/v2/name/';
var countriesList = $('#countries');

$('#search').click(searchCountries);

function searchCountries() {
    var countryName = $('#country-name').val();
    if (!countryName.length) {
        countryName = 'Poland';
    }
    $.ajax({
        dataType: 'JSON',
        url: url + countryName,
        method: 'GET',
        success: showCountriesList,
        error: showError
    })
}


function showCountriesList(resp) {
    countriesList.empty();
    resp.forEach(function (item) {
        var $table = $('<table>').addClass('table table-bordered table-striped');
        $table.append('<caption>' + item.name + '</caption>').appendTo(countriesList);
        var $tbody = $table.append('<tbody></tbody>').children('tbody');
        $tbody.append('<tr></tr>').children('tr:last').append('<td>Flag:</td>').append('<td><img class="flag-img" src=\"' + item.flag + '\"></img></td>')
        $tbody.append('<tr></tr>').children('tr:last').append('<td>Region:</td>').append('<td>' + item.region + '</td>');
        $tbody.append('<tr></tr>').children('tr:last').append('<td>Capital:</td>').append('<td>' + item.capital + '</td>');
        $tbody.append('<tr></tr>').children('tr:last').append('<td>Language:</td>').append('<td>' + item.languages[0].name + '</td>');
        $tbody.append('<tr></tr>').children('tr:last').append('<td>Population:</td>').append('<td>' + item.population + '</td>');
    });
}

function showError(resp) {
    countriesList.empty();
    if (resp.status == 404) {
        $('<p>').text("No data found").appendTo(countriesList);
    };
}
