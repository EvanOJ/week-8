/* =====================
Lab 1: Turf.js

"Our maps have only interpreted data in various ways; the point is to change it."


In the coming weeks, we'll be looking at ways to explore, analyze, and create data.
This will require us to build upon concepts that we've already mastered. Turf.js is a
javascript library which provides some excellent utilities for fast, in-browser
spatial analysis.

Recall that GeoJSON is a format for representing spatial objects in JSON. It encodes
not only the geometric entities themselves (Points, Lines, Polygons) but also associated
properties (these are the properties of Features) and collections thereof (FeatureGroups).

This is useful for sending spatial data over the wire (we can present these objects in text
since they are JSON). But the predictable structure of a geojson object (there are
infinitely many possible geojson objects, though they all meet the criteria specified
here: http://geojson.org/) also benefits us by offering a structure which our code can
expect.

Consider the functions you've written before: their input has depended on the type
of data they receive. If you write a function which expects an object that has an 'x' and
a 'y' property, you can access those within your function body:

function exampleFunction(someObject) {
  return someObject.x + someObject.y;
}
exampleFunction({x: 1, y: 22}) === 23

Turf leans on the predictable structure of geojson to provide its analytic functions.
Here, Turf lays out the types you can expect to find throughout its documentation:
http://turfjs.org/static/docs/global.html

Let's look to a turf function's docs: http://turfjs.org/static/docs/module-turf_average.html
==================================================================================================
name              - Type                        - Description
==================================================================================================
polygons          - FeatureCollection.<Polygon> - polygons with values on which to average
points            - FeatureCollection.<Point>   - points from which to calculate they average
field             - String                      - the field in the points features from which to
                                                  pull values to average
outputField       - String                      - the field in polygons to put results of the averages
==================================================================================================
Returns           - FeatureCollection.<Polygon> - polygons with the value of outField set to
                                                  the calculated averages
==================================================================================================

What this tells us is that turf.average takes four arguments. The first
argument is a FeatureCollection of Polygons, the second, is a FeatureCollection
of Points, the third and fourth is a bit of text.

With those inputs, a FeatureCollection of polygons is produced which has the average value
of "field" from the points (captured within a spatial join) stored on its properties' field
"outputField".

All of the functionality within turf can be similarly understood by looking to its documentation.
Turf documentation: http://turfjs.org/static/docs/
Turf examples: http://turfjs.org/examples.html


Each exercise in this lab involves the creation of GeoJSON (feel free to use geojson.io) and
the use of that GeoJSON in some turf functions.

NOTE: you can use geojson.io's table view to attach properties to your geometries!

Exercise 1: Finding the nearest point
Take a look at http://turfjs.org/static/docs/module-turf_nearest.html
Produce a Feature and a FeatureCollection (look to the in-documentation examples if this is
unclear) such that the single Point Feature is in Philadelphia and the nearest point in the
FeatureCollection (there should be at least two other points in this collection) happens
to be in New York City. Plot the NYC point and no others with the use of turf.nearest.
*/

// var point = {
//       "type": "Feature",
//       "properties": {},
//       "geometry": {
//         "type": "Point",
//         "coordinates": [
//           -75.1655387878418,
//           39.952122111941506
//         ]
//       }
// };
// console.log(point);
//
// var against = {
//   "type": "FeatureCollection",
//   "features": [
//     {
//       "type": "Feature",
//       "properties": {},
//       "geometry": {
//         "type": "Point",
//         "coordinates": [
//           -73.992919921875,
//           40.74725696280421
//         ]
//       }
//     },
//     {
//       "type": "Feature",
//       "properties": {},
//       "geometry": {
//         "type": "Point",
//         "coordinates": [
//           -78.563232421875,
//           38.09998264736481
//         ]
//       }
//     }
//   ]
// };
// console.log(against);
//
// var mapBoundary = L.geoJson(turf.envelope(against)).getBounds(); map.fitBounds(mapBoundary);
//
// var nearest = turf.nearest(point, against);
// nearest.properties['marker-color'] = '#0f0';
//
// console.log(nearest);
//
// L.geoJson(nearest).addTo(map);
//
// var resultFeatures = against.features.concat(point);


/*
Exercise 2: Finding the average point value (a form of spatial join)
Docs here: http://turfjs.org/static/docs/module-turf_average.html
Produce one FeatureCollection of points (at least 5) and one of polygons (at least 2)
such that, by applying turf.average, you generate a new set of polygons in which one of
the polygons has the property "averageValue" with a value of 100.
*/

/*
var polygons = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [10.666351, 59.890659],
          [10.666351, 59.936784],
          [10.762481, 59.936784],
          [10.762481, 59.890659],
          [10.666351, 59.890659]
        ]]
      }
    }, {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [10.764541, 59.889281],
          [10.764541, 59.937128],
          [10.866165, 59.937128],
          [10.866165, 59.889281],
          [10.764541, 59.889281]
        ]]
      }
    }
  ]
};
var points = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "population": 200
      },
      "geometry": {
        "type": "Point",
        "coordinates": [10.724029, 59.926807]
      }
    }, {
      "type": "Feature",
      "properties": {
        "population": 600
      },
      "geometry": {
        "type": "Point",
        "coordinates": [10.715789, 59.904778]
      }
    }, {
      "type": "Feature",
      "properties": {
        "population": 100
      },
      "geometry": {
        "type": "Point",
        "coordinates": [10.746002, 59.908566]
      }
    }, {
      "type": "Feature",
      "properties": {
        "population": 200
      },
      "geometry": {
        "type": "Point",
        "coordinates": [10.806427, 59.908910]
      }
    }, {
      "type": "Feature",
      "properties": {
        "population": 300
      },
      "geometry": {
        "type": "Point",
        "coordinates": [10.79544, 59.931624]
      }
    }
  ]
};
var mapBoundary = L.geoJson(turf.envelope(polygons)).getBounds(); map.fitBounds(mapBoundary);

L.geoJson(points).addTo(map);

var averaged = turf.average(
 polygons, points, 'population', 'pop_avg');


var resultFeatures = points.features.concat(
  averaged.features);

var result = {
  "type": "FeatureCollection",
  "features": resultFeatures
};
console.log(averaged);

function onEachFeature(resultFeatures,layer) {
  if (resultFeatures.properties.pop_avg) {
    layer.bindPopup(resultFeatures.properties.pop_avg +"");
  }
}

L.geoJson(averaged, {
  onEachFeature:onEachFeature
}).addTo(map);



//=result
*/
/*
Exercise 3: Tagging points according to their locations
http://turfjs.org/static/docs/module-turf_tag.html
It can be quite useful to 'tag' points in terms of their being within this or that
polygon. You might, for instance, want to color markers which represent dumpsters
according to the day that trash is picked up in that area. Create three polygons
and use properties on those polygons to color 5 points.
*/
/*
var bbox = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -87.7979278564453,
              41.77233588526914
            ],
            [
              -87.7979278564453,
              41.99981487182158
            ],
            [
              -87.49443054199217,
              41.99981487182158
            ],
            [
              -87.49443054199217,
              41.77233588526914
            ],
            [
              -87.7979278564453,
              41.77233588526914
            ]
          ]
        ]
      }
    }
  ]
};
// create a triangular grid of polygons
var triangleGrid = turf.triangleGrid(bbox, 50, 'miles');
triangleGrid.features.forEach(function(f) {
  f.properties.fill = '#' +
    (~~(Math.random() * 16)).toString(16) +
    (~~(Math.random() * 16)).toString(16) +
    (~~(Math.random() * 16)).toString(16);
  f.properties.stroke = 0;
  f.properties['fill-opacity'] = 1;
});
var randomPoints = turf.random('point', 30, {
  bbox: bbox
});
var both = turf.featurecollection(
  triangleGrid.features.concat(randomPoints.features));

var mapBoundary = L.geoJson(turf.envelope(bbox)).getBounds(); map.fitBounds(mapBoundary);

var tagged = turf.tag(randomPoints, triangleGrid,
                      'fill', 'marker-color');

console.log(both);
*/


/*
*STRETCH GOAL*
Exercise 4: Calculating a destination
A species of bird we're studying is said to travel in a straight line for 500km
during a migration before needing to rest. One bird in a flock we want to track
has a GPS tag which seems to be on the fritz. We know for a fact that it started
flying from [-87.4072265625, 38.376115424036016] and that its last known coordinate
was [-87.5830078125, 38.23818011979866]. Given this information, see if you can
determine where we can expect this flock of birds to rest.
===================== */

// var birdPoints = {
//   "type": "FeatureCollection",
//   "features": [
//     {
//       "type": "Feature",
//       "properties": {
//         "marker-color": "#7e7e7e",
//         "marker-size": "medium",
//         "marker-symbol": "",
//         "ID": 1
//       },
//       "geometry": {
//         "type": "Point",
//         "coordinates": [
//           -87.4072265625,
//           38.376115424036016
//         ]
//       }
//     },
//     {
//       "type": "Feature",
//       "properties": {
//         "marker-color": "#7e7e7e",
//         "marker-size": "medium",
//         "marker-symbol": "",
//         "ID": 2
//       },
//       "geometry": {
//         "type": "Point",
//         "coordinates": [
//           -87.5830078125,
//           38.23818011979866
//         ]
//       }
//     }
//   ]
// };

// coordinates given are geographically flipped (antarctica)

var birdStart = [-87.4072265625, 38.376115424036016];
var birdLost = [-87.5830078125, 38.23818011979866];

var start = turf.point(birdStart,"start");
var lost = turf.point(birdLost, "lost");

L.geoJson(start).addTo(map);
L.geoJson(lost).addTo(map);

var bearing = turf.bearing(start, lost);

var destination = turf.destination(lost,500,bearing, "kilometers");
console.log(destination.geometry.coordinates);
L.geoJson(destination).addTo(map);

var path = L.polyline([birdStart.reverse(),birdLost.reverse(),destination.geometry.coordinates.reverse()], {color: 'red',dashArray: "20,40", weight:"20", lineCap:"square"}).addTo(map);

var searchRadius = L.circle(birdLost,500000, {color:"#fc9272"}).addTo(map);
var pathJSON = path.toGeoJSON();
var mapBoundary = L.geoJson(turf.envelope(pathJSON)).getBounds(); map.fitBounds(mapBoundary);


// var polyline = L.polyline([birdStart,birdLost], {color: 'red'}).addTo(map);

// L.geoJson(lost, {
//     pointToLayer: function (feature, latlng) {
//         return L.circle(birdLostflip,500000);
//     }
// }).addTo(map);

// var linestring = turf.linestring([
//     birdStart,
//     birdLost,
//     ], {
//     "stroke": "#6BC65F",
//     "stroke-width": 5
// });

// L.geoJson(linestring).addTo(map);
