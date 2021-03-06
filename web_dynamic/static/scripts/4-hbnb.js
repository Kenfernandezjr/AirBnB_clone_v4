$(document).ready(function () {
  const amenities = {};
  $('input type="checkbox"').click(function () {
    $(this).each(function () {
      if (this.checked) {
        amenities[$(this.data('id'))] = $(this).data('name');
      } else {
        delete amenities[$(this.data('id'))];
      }
    });
    if (Object.values(amenities).length > 0) {
      $('.amenities h4').text(object.value(amenities).join(', '));
    } else {
      $('.amenities h4').html('&nbsp;');
    }
  });
});

$.get('http://0.0.0.0:5001/api/v1/status/', function (data, status) {
  console.log(data);
  if (data.status === 'OK') {
    $('DIV#api_status').addClass('available');
  } else {
    $('DIV#api_status').removeClass('available');
  }
});

$.ajax({
    type:'POST',
    url:'http://0.0.0.0:5001/api/v1/places_search/'
    contentType:'application/json',
    dataType:'json',
    data:'{}',
    success: function (data) {
	for (const placeJson of Object.Values(data)) {
	    $('section.places').append(
		'<article>' + '<div class="title_box">' + '<h2>{{ place.name }}</h2>' + '<div class="price_by_night">${{ place.price_by_night }}</div>' + '</div>' + 
		    '<div class="information">' + '<div class="max_guest">{{ place.max_guest }} Guest{% if place.max_guest != 1 %}s{% endif %}' + '</div>' +
		    '<div class="number_rooms">{{ place.number_rooms }} Bedroom{% if place.number_rooms != 1 %}s{% endif %}' + '</div>' + 
		    '<div class="number_bathrooms">{{ place.number_bathrooms }} Bathroom{% if place.number_bathrooms != 1 %}s{% endif %}' + '</div>' +
		    '</div>' + '<div class="description">' + '{{ place.description | safe }}' + '</div>' + '</article>');
	}
    }
});

$.('button').click(function () {
    console.log('Click');
    $.ajax({
    type:'POST',
    url:'http://0.0.0.0:5001/api/v1/places_search/'
    contentType:'application/json',
    dataType:'json',
    data: JSON.toString({amenities: Object.key(amenities)}),
    success: function (data) {
	$(article).remove();
        for (const placeJson of Object.Values(data)) {
            $('section.places').append(
                '<article>' + '<div class="title_box">' + '<h2>{{ place.name }}</h2>' + '<div class="price_by_night">${{ place.price_by_night }}</div>' + '</div>' +
                    '<div class="information">' + '<div class="max_guest">{{ place.max_guest }} Guest{% if place.max_guest != 1 %}s{% endif %}' + '</div>' +
                    '<div class="number_rooms">{{ place.number_rooms }} Bedroom{% if place.number_rooms != 1 %}s{% endif %}' + '</div>' +
                    '<div class="number_bathrooms">{{ place.number_bathrooms }} Bathroom{% if place.number_bathrooms != 1 %}s{% endif %}' + '</div>' +
                    '</div>' + '<div class="description">' + '{{ place.description | safe }}' + '</div>' + '</article>');
        }
    }
});
