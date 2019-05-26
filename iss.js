// const mymap = L.map('issMap').setView([51.505, -0.09], 13);
const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
let marker;

async function getISS() {
    const response = await fetch(api_url);
    const data = await response.json();
    // console.log(data);
    const { latitude, longitude } = data;
    // console.log(latitude, longitude);
    document.getElementById('lat').textContent = latitude;
    document.getElementById('lon').textContent = longitude;
    marker.setLatLng([latitude, longitude]);
}

window.addEventListener('load', function () {
    // Making map with tiles
    const mymap = L.map('issMap').setView([0, 0], 1);
    const attribution = "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreet Maps</a>";
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(mymap);

    // Making marker with custom icon
    const issIcon = L.icon({
        iconUrl: 'iss.png',
        iconSize: [50, 32],
        iconAnchor: [25, 16]
    });
    marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);

    // Run every minute
    setInterval(function () {
        getISS();
    }, 1000);
});

