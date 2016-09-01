jQuery(function($) {
    // Asynchronously Load the map API 
    $.getJSON('../keys/googleMapkey.json', function(key) {
        var script = document.createElement('script');
        script.src = "//maps.googleapis.com/maps/api/js?key=" + key[0].key + "&callback=initialize";
        document.body.appendChild(script);
     });   
});

function initialize() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };
                    
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);                        
        
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    
    // Loop through our array of markers & place each one on the map  
    $.getJSON('../topspots.json', function(markers) {
        for( i = 0; i < markers.length; i++ ) {
            var position = new google.maps.LatLng(markers[i].location[0], markers[i].location[1]);
            bounds.extend(position);
            marker = new google.maps.Marker({
                position: position,
                map: map,
                title: markers[i].name
            });
            
            // Allow each marker to have an info window    
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infoWindow.setContent('<div class="info_content"><h3>' + markers[i].name + '</h3><p>' + markers[i].description + '</p></div>');
                    infoWindow.open(map, marker);
                }
            })(marker, i));

            // Automatically center the map fitting all markers on the screen
            map.fitBounds(bounds);
        }
    });

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(10);
        google.maps.event.removeListener(boundsListener);
    });

}