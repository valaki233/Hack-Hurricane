mapboxgl.accessToken = 'YOUR API KEY HERE';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-117.918911, 33.812373], // starting position
    zoom: 15
});
const fetchy = [];
fetch('/attractions')
.then(async response => await response.json())
.then(attractions => {
    console.log(attractions.attractions);
    const fetchy = attractions.attractions.map(attraction => {
        const latitude = attraction.lat;
        const longitude = attraction.long;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        return {
            name: attraction.name,
            coordinates: [longitude, latitude]
        };
    });
    
    console.log(typeof(attractions));
    
    console.log(fetchy);
    return fetch(
        `https://api.mapbox.com/directions/v5/mapbox/cycling/${fetchy.map(stop => stop.coordinates.join(',')).join(';')}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
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

// Select the ul element with the class 'stops'
const stopsList = document.querySelector('.stops');

// Fetch data from '/attractions'
fetch('/attractions')
    .then(async response => await response.json())
    .then(attractions => {
        // Iterate over the attractions array
        attractions.attractions.forEach(attraction => {
            // Create a new li element
            const listItem = document.createElement('li');

            // Set the text content to the attraction name
            listItem.textContent = attraction.name;
            listItem.style.paddingBottom = '5px';
            listItem.style.paddingTop = '5px';

            // Add latitude and longitude as classes to the li element
            listItem.classList.add(`${attraction.lat}`);
            listItem.classList.add(`${attraction.long}`);

            // Append the li element to the ul
            stopsList.appendChild(listItem);


            const marker2 = new mapboxgl.Marker({
                color: "#3887be",
                background: "transparent",
                draggable: false
                }).setLngLat([attraction.long, attraction.lat])
            .addTo(map);

            // Create a popup
            const popup = new mapboxgl.Popup({ offset: 25 })
                .setHTML(`<h3 style="color: black; margin-bottom: 0; margin-top: 14px;">${attraction.name}</h3>`);

            // Add the popup to the marker
            marker2.setPopup(popup);
            
            // Add click event listener to the li element
            listItem.addEventListener('click', () => {
                // Code to run when the text is clicked
                console.log(`${attraction.name}`);

                map.jumpTo({ center: [attraction.long, attraction.lat], zoom: 18 });

                
            });
        });

    })
    .catch(error => console.error('Error:', error));
