var map; // Armazena o objeto de mapa do Google
var service; // Armazena o serviço de busca de lugares do Google
var markers = []; // Armazena os marcadores na lista

function initMap() { // Chamada quando abre a página
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -23.5505, lng: -46.6333 }, // Coordenadas iniciais (São Paulo)
    zoom: 1.5, // Zoom inicial
    // zoomControl: false, // Desativa o controle de zoom padrão do Google Maps
    // streetViewControl: false, // Desativa o controle de visão de rua padrão do Google Maps
    mapTypeControl: false // Desativa o controle de tipo de mapa (Mapa / Satélite) 
  });

  var input = document.getElementById('pac-input'); // Variável que pega o valor da input
  var search = document.getElementById('container')
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(search);
  map.addListener('bounds_changed', function () {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];

  searchBox.addListener('places_changed', function () {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    markers.forEach(function (marker) {
      marker.setMap(null);
    });
    markers = [];

    var bounds = new google.maps.LatLngBounds();
    places.forEach(function (place) {
      if (!place.geometry) {
        console.log("Localização retornada sem coordenadas: ", place);
        return;
      }

      markers.push(new google.maps.Marker({
        map: map,
        title: place.name,
        position: place.geometry.location
      }));



      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

// Função para buscar lojas de música próximas à localização do usuário
function searchNearby() {

  var request = {
    location: map.getCenter(),
    radius: '5000', // Raio de busca de 5km
    keyword: 'loja de música'
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      clearMarkers();
      showPlacesList(results);
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  });
}

function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  markers.push(marker);
}

function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

function showPlacesList(places) {
  var placesList = document.getElementById('placesList');
  placesList.innerHTML = '';
  for (var i = 0; i < places.length; i++) {
    var place = places[i];
    var li = document.createElement('div');

    var name = document.createElement('strong');
    name.textContent = place.name;
    li.appendChild(name);

    if (place.vicinity) {
      var address = document.createElement('p');
      address.textContent = 'Endereço: ' + place.vicinity;
      li.appendChild(address);
    }

    if (place.formatted_phone_number) {
      var phone = document.createElement('p');
      phone.textContent = 'Telefone: ' + place.formatted_phone_number;
      li.appendChild(phone);
    }

    if (place.website) {
      var website = document.createElement('p');
      website.innerHTML = 'Site: <a href="' + place.website + '" target="_blank">' + place.website + '</a>';
      li.appendChild(website);
    }

    if (place.opening_hours && place.opening_hours.weekday_text) {
      var openingHours = document.createElement('p');
      openingHours.textContent = 'Horário de Funcionamento:';
      place.opening_hours.weekday_text.forEach(function (weekday) {
        openingHours.innerHTML += '<br>' + weekday;
      });
      li.appendChild(openingHours);
    }

    // if (place.photos && place.photos.length > 0) {
    //   var photo = document.createElement('img');
    //   photo.src = place.photos[0].getUrl({ maxWidth: 100, maxHeight: 100 });
    //   li.appendChild(photo);
    // }

    placesList.appendChild(li);
  }
}
var cont = 1;

// Função para criar marcadores para os lugares encontrados
function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  var infoWindow = new google.maps.InfoWindow({
    content: place.name // Define o conteúdo do info window como o nome do local
  });

  // Adiciona um evento de clique ao marcador
  marker.addListener('click', function () {
    infoWindow.open(map, marker); // Abre o info window no mapa, acima do marcador
  });

  markers.push(marker); // Adiciona o marcador à lista de marcadores
}


function toggleList() {
  var sidebar = document.getElementById('sidebar');
  var search = document.getElementById('search-bar');
  var arrow = document.getElementById('arrow_map');
  var container = document.getElementById('container');
  var resto = cont % 2;

  if (resto == 0) {
    sidebar.style.top = '-352px';
    search.style = 'border-radius: 25px; margin-left: 10px; margin-top: 10px';
    arrow.style = 'transform: rotate(45deg);';
    container.style = 'height: fit-content;';
    cont++;
  } else {
    sidebar.style.top = '49px';
    search.style = 'border-radius: 0; margin-top: 0px; margin-left: 0px;';
    arrow.style = 'transform: rotate(225deg);';
    container.style = 'height: 400px;';
    cont++;
  }
}