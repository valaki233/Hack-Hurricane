mapboxgl.accessToken = 'pk.eyJ1IjoidmFsYWtpIiwiYSI6ImNscXk5ajJzNDBtc2wyanBjYTVjNDR6NjcifQ.tV3Rh4n0ZrApBUotAZe-yQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-117.918911, 33.812373], // starting position
    zoom: 15
});

fetch('/attractions')
.then(async response => await response.json())
.then(attractions => {
    console.log(attractions.attractions);
    const fetchy = attractions.attractions.map(attraction => {
        const latitude = attraction.lat;
        const longitude = attraction.long;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        return `${longitude},${latitude}`; // Swap longitude and latitude positions
    }).join(';'); // Join the array elements with a semicolon
    
    console.log(typeof(attractions));
    
    console.log(fetchy);
    return fetch(
        `https://api.mapbox.com/directions/v5/mapbox/cycling/${fetchy}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
        { method: 'GET' }
    );
})
    .then(response => response.json())
    .then(data => {
        const route = data.routes[0].geometry.coordinates;
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
        } else { // otherwise, we'll add it to the map
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
                    'line-width': 5,
                    'line-opacity': 0.75
                }
            });
        }
    })
    .catch(error => console.error('Error:', error));
