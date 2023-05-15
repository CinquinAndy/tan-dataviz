import L from 'leaflet'

const iconTram = new L.Icon({
	iconUrl: './leaflet/tram-stop.svg',
	iconRetinaUrl: './leaflet/tram-stop.svg',
	iconAnchor: null,
	popupAnchor: null,
	shadowUrl: null,
	shadowSize: null,
	shadowAnchor: null,
	iconSize: new L.Point(75, 30),
})

export { iconTram }
