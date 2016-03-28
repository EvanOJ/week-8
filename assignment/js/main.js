

// Global Variables
// var myRectangles = [];
var myRectangle;
var publicArt;


$.ajax('https://raw.githubusercontent.com/cambridgegis/cambridgegis_data/master/Landmark/Public_Art/LANDMARK_PublicArt.geojson').done(function(data) {
  var parsed = JSON.parse(data);
  publicArt = _.chain(parsed).value();
  var layer = L.geoJson(publicArt).addTo(map);
  var mapBoundary = L.geoJson(turf.envelope(publicArt)).getBounds();
  map.fitBounds(mapBoundary);
});

// Initialize Leaflet Draw

var drawControl = new L.Control.Draw({
  draw: {
    polyline: false,
    polygon: false,
    circle: false,
    marker: false,
    rectangle: true,
  }
});

map.addControl(drawControl);

// Run every time Leaflet draw creates a new layer

map.on('draw:created', function (e) {
    // if(within) {map.removeLayer(within);
    //     $("#shapes").empty();}
    var type = e.layerType; // The type of shape
    var layer = e.layer; // The Leaflet layer for the shape
    // myRectangle = layer;
    var id = L.stamp(layer); // The unique Leaflet ID for the layer
    // map.addLayer(layer);
    // $("#shapes").append('<h1 id = ' +id+ '>Current ID: ' +id+ '</h1></div>');
    var shape = layer.toGeoJSON();
var drawLayer = [];
      drawLayer.push(layer);
      map.addLayer(layer);
myRectangle = {
  "type": "FeatureCollection",
  "features":[shape]
};
var within = turf.within(publicArt,myRectangle);

_.each(within.features, function(element){
  var htmlAppend = '<div  class = "shape" style = "border:solid; background-color: #'+Math.random().toString(16).slice(-6)+'" id= "shape-'+element.id+'" data-id = "'+element.id+'"> <p> ID: '+element.properties.ArtID+'</p> Name <p>'+element.properties.First_Name+'</p>  </div>';
  $('#shapes').append(htmlAppend);

  $('[data-id = "'+element.id+'"]').on('click',function(){
   var clickId = $(this).data('id');
   var point =_.filter(within.features,function(ob) { return ob.id === clickId;});
  //  console.log(clickId);
  //  console.log(point);
   L.geoJson(point, {
         pointToLayer: function (feature, latlng) {
             return L.circleMarker(latlng, {
              //  fillColor: "#",
               opacity: 0.5
             });
         }
     }).addTo(map);
  });



//close
});
});


$( ".sidebar").click(function() {
  var color = $( "#shapes" ).css( "background-color" );
  console.log(color);});
