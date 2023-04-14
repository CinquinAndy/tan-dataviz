import Head from 'next/head'

import Map from '@components/Map'

const DEFAULT_CENTER = [38.907132, -77.036546]

export default function Home() {
	return (
		<>
			<Head>
				<title>Tan dataviz</title>
				<meta name="description" content="Tan Dataviz project" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<section className={'h-screen w-screen'}>
				<Map width="800" height="400" center={DEFAULT_CENTER} zoom={12}>
					{({ TileLayer, Marker, Popup }) => (
						<>
							<TileLayer
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
								attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
							/>
							<Marker position={DEFAULT_CENTER}>
								<Popup>
									A pretty CSS3 popup. <br /> Easily customizable.
								</Popup>
							</Marker>
						</>
					)}
				</Map>
			</section>
		</>
	)
}
