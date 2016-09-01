$(document).ready(function() {

    $.getJSON('topspots.json',function(data) {
        // console.log(JSON.stringify(data));
        var rows = data.length;
        $.each(data, function(key, val){
           var tr = '<tr>';
           $.each(val, function(k, v) {
                // console.log(tr);
                if (k === 'location') {
                    tr += '<td><a class="btn btn-primary" href="http://maps.google.com/?ll=' + v + '" role="button">Open in Google Maps</a></td>'; 
                } else {
                    tr += '<td>' + v + '</td>';
                };     
           });
           tr += '</tr>';
           $('#topSpotsTable').append(tr);
        });
    });
});


