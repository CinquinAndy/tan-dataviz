import L from 'leaflet'

const iconBus = new L.Icon({
	iconUrl: './leaflet/bus-stop.svg',
	iconRetinaUrl: './leaflet/bus-stop.svg',
	iconAnchor: null,
	popupAnchor: null,
	shadowUrl: null,
	shadowSize: null,
	shadowAnchor: null,
	iconSize: new L.Point(75, 30),
})

export { iconBus }
