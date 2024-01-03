const fetch = require('node-fetch');

const pData = { key1: 'value1', key2: 'value2' };

fetch('/getroute', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(pData),
})
.then(response => response.json())
.then(data => console.log(data))
.catch((error) => console.error('Error:', error));


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
if (map.getSource('route')) {
map.getSource('route').setData(geojson);
} else {
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
    'line-color': '#3887be',
    }
});
}