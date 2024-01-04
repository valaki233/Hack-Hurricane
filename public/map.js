
// const pData = { key1: 'value1', key2: 'value2' };

// fetch('/getroute', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(pData),
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch((error) => console.error('Error:', error));


// const data = json.routes[0];
// const route = data.geometry.coordinates;
// const geojson = {
// type: 'Feature',
// properties: {},
// geometry: {
//     type: 'LineString',
//     coordinates: route
// }
// };
// if (map.getSource('route')) {
// map.getSource('route').setData(geojson);
// } else {
// map.addLayer({
//     id: 'route',
//     type: 'line',
//     source: {
//     type: 'geojson',
//     data: geojson
//     },
//     layout: {
//     'line-join': 'round',
//     'line-cap': 'round'
//     },
//     paint: {
//     'line-color': '#3887be',
//     }
// });
// }

mapboxgl.accessToken = 'pk.eyJ1IjoidmFsYWtpIiwiYSI6ImNscXk5ajJzNDBtc2wyanBjYTVjNDR6NjcifQ.tV3Rh4n0ZrApBUotAZe-yQ';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [-122.662323, 45.523751], // starting position
  zoom: 12
});
// create a function to make a directions request
async function getRoute(end) {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      { method: 'GET' }
    );
    const json = await query.json();
    const data = json.routes[0];
    const route = data.geometry.coordinates;
    const geojson = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: route
      }
    };
    // if the route already exists on the map, we'll reset it using setData
    if (map.getSource('route')) {
      map.getSource('route').setData(geojson);
    }
    // otherwise, we'll make a new request
    else {
      map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: geojson
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be'
        }
      });
    }
}