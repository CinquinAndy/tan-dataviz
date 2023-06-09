import Head from 'next/head'

import Map from '@components/Map'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { gps_coordinates_nantes } from '@/utils/consts'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Nav } from '@components/Global/nav'

export default function Home() {
	const [isLoadingStopTimes, setIsLoadingStopTimes] = React.useState(true)
	const [popupStopHeadsignName, setPopupStopHeadsignName] = React.useState(null)
	const [popupStopLineName, setPopupStopLineName] = React.useState(null)
	const [popupStopType, setPopupStopType] = React.useState(null)
	const [popupWheelchairAccessible, setPopupWheelchairAccessible] =
		React.useState(null)
	const [popupStopTimes, setPopupStopTimes] = React.useState(null)
	const [shapes, setShapes] = React.useState([])
	const [iconBus, setIconBus] = React.useState(null)
	const [iconTram, setIconTram] = React.useState(null)
	const [iconBusway, setIconBusway] = React.useState(null)
	const [iconNavibus, setIconNavibus] = React.useState(null)
	const [iconNavette, setIconNavette] = React.useState(null)

	const [filterSelected, setFilterSelected] = React.useState('all')

	useEffect(() => {
		if (typeof window !== 'undefined') {
			import('leaflet').then(L => {
				setIconBus(
					new L.Icon({
						iconRetinaUrl: 'leaflet/bus-stop.svg',
						iconUrl: 'leaflet/bus-stop.svg',
						iconSize: new L.Point(75, 30),
					})
				)
				setIconTram(
					new L.Icon({
						iconUrl: './leaflet/tram-stop.svg',
						iconRetinaUrl: './leaflet/tram-stop.svg',
						iconSize: new L.Point(75, 30),
					})
				)
				setIconBusway(
					new L.Icon({
						iconUrl: './leaflet/busway-stop.svg',
						iconRetinaUrl: './leaflet/busway-stop.svg',
						iconSize: new L.Point(75, 30),
					})
				)
				setIconNavibus(
					new L.Icon({
						iconUrl: './leaflet/navibus-stop.svg',
						iconRetinaUrl: './leaflet/navibus-stop.svg',
						iconSize: new L.Point(75, 30),
					})
				)
				setIconNavette(
					new L.Icon({
						iconUrl: './leaflet/navette-stop.svg',
						iconRetinaUrl: './leaflet/navette-stop.svg',
						iconSize: new L.Point(75, 30),
					})
				)
			})
		}
		if (shapes !== []) {
			fetchShapes().then(res => {
				// filter res by shape_id and add an array with all the coordinates of the shape and order by shape_pt_sequence
				function groupByShapeId(data) {
					return data.reduce((acc, curr) => {
						if (!acc[curr.shape_id]) {
							acc[curr.shape_id] = []
						}
						acc[curr.shape_id].push([curr.shape_pt_lon, curr.shape_pt_lat])
						return acc
					}, {})
				}

				function objectToArray(groupedData) {
					return Object.entries(groupedData).map(([shape_id, coordinates]) => {
						return { shape_id, coordinates }
					})
				}

				const groupedData = groupByShapeId(res)
				const groupedArray = objectToArray(groupedData)
				setShapes(groupedArray)
			})
		}
	}, [])

	const { isLoading, isError, data, error } = useQuery({
		queryKey: ['stops'],
		queryFn: async () => {
			const res = await fetch(
				`https://strapi-tandataviz-core.beta.andy-cinquin.fr/stops?_limit=-1`,
				{
					method: 'GET',
					headers: {
						// 	token
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				}
			)
			return res.json()
		},
	})

	const fetchShapes = async () => {
		// 	`https://strapi-tandataviz-core.beta.andy-cinquin.fr/stop-times?_limit=-1&stop_id_contains=${stop.stop_id}`
		const res = await fetch(
			`https://strapi-tandataviz-core.beta.andy-cinquin.fr/shapes?_limit=-1`,
			{
				method: 'GET',
				headers: {
					// 	token
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			}
		)
		return res.json()
	}

	const fetchDataStopLimits = async stop_id => {
		// 	`https://strapi-tandataviz-core.beta.andy-cinquin.fr/stop-times?_limit=-1&stop_id_contains=${stop.stop_id}`
		const res = await fetch(
			`https://strapi-tandataviz-core.beta.andy-cinquin.fr/stop-times?_limit=1&stop_id_contains=${stop_id}&_sort=trip_id:ASC`,
			{
				method: 'GET',
				headers: {
					// 	token
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			}
		)
		return res.json()
	}

	const fetchDataStopTimes = async stop_id => {
		const res = await fetch(
			`https://strapi-tandataviz-core.beta.andy-cinquin.fr/stop-times?_limit=-11&stop_id_contains=${stop_id}&_sort=trip_id:ASC`,
			{
				method: 'GET',
				headers: {
					// 	token
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			}
		)
		return res.json()
	}

	const fetchDataTripsLimits = async trip_id => {
		// 	`https://strapi-tandataviz-core.beta.andy-cinquin.fr/stop-times?_limit=-1&stop_id_contains=${stop.stop_id}`
		const res = await fetch(
			`https://strapi-tandataviz-core.beta.andy-cinquin.fr/trips?_limit=1&trip_id=${trip_id}`,
			{
				method: 'GET',
				headers: {
					// 	token
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			}
		)
		return res.json()
	}

	const fetchDataRoutesLimits = async route_id => {
		// 	`https://strapi-tandataviz-core.beta.andy-cinquin.fr/stop-times?_limit=-1&stop_id_contains=${stop.stop_id}`
		const res = await fetch(
			`https://strapi-tandataviz-core.beta.andy-cinquin.fr/routes?_limit=1&route_id=${route_id}`,
			{
				method: 'GET',
				headers: {
					// 	token
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			}
		)
		return res.json()
	}

	const handleChangeFilterSelected = value => {
		setFilterSelected(value)
	}

	if (isLoading) return <>loader</>

	if (error) return 'An error has occurred: ' + error.message

	return (
		<>
			<Head>
				<title>Tan dataviz</title>
				<meta name="description" content="Tan Dataviz project" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<section className={'flex h-screen w-screen'}>
				<Nav
					handleChangeFilterSelected={handleChangeFilterSelected}
					filterSelected={filterSelected}
				/>
				{typeof window !== 'undefined' && (
					<Map
						width="800"
						height="400"
						center={gps_coordinates_nantes}
						// scrollWheelZoom={false}
						zoom={16}
					>
						{({ TileLayer, Marker, Popup, Polyline, Polygon }) => (
							<>
								<TileLayer
									url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
									attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
								/>
								{/*
								 foreach shapes create a polyline
								*/}
								{shapes &&
									shapes.map(shape => {
										// generate random color, based on shape_id
										const color = '#' + shape.shape_id.slice(0, 6)
										const style = {
											fillColor: 'transparent',
											fillOpacity: 0,
											weight: 2,
											color: color,
											opacity: 0.2,
										}
										return (
											<Polyline
												key={shape.shape_id}
												pathOptions={style}
												positions={shape.coordinates.map(row => [
													row[1],
													row[0],
												])}
											/>
										)
									})}

								{data.map(stop => {
									let transport_type_icon = iconBus
									switch (stop.transport_type) {
										case 'tram':
											transport_type_icon = iconTram
											break
										case 'navibus':
											transport_type_icon = iconNavibus
											break
										case 'busway':
											transport_type_icon = iconBusway
											break
										case 'navette':
											transport_type_icon = iconNavette
											break
										default:
											transport_type_icon = iconBus
											break
									}
									let transport_type = stop.transport_type ?? 'bus'
									if (filterSelected !== 'all') {
										if (transport_type !== filterSelected) {
											return
										}
									}
									return (
										<Marker
											key={stop.id}
											position={[stop.stop_lat, stop.stop_lon]}
											icon={transport_type_icon}
											eventHandlers={{
												click: event => {
													event.target.openPopup()
													setPopupStopHeadsignName(null)
													setPopupWheelchairAccessible(null)
													setPopupStopType(null)
													setIsLoadingStopTimes(true)
													fetchDataStopLimits(stop.stop_id).then(r => {
														if (r !== undefined && r.length > 0) {
															setPopupStopType(r[0].transport_type || 'BUS')

															fetchDataTripsLimits(r[0].trip_id).then(r => {
																if (r !== undefined && r.length > 0) {
																	setPopupStopHeadsignName(r[0].trip_headsign)
																	setPopupWheelchairAccessible(
																		r[0].wheelchair_accessible === 1
																	)
																	fetchDataRoutesLimits(r[0].route_id).then(
																		r => {
																			if (r !== undefined && r.length > 0) {
																				setPopupStopLineName(
																					r[0].route_short_name
																				)
																				setIsLoadingStopTimes(false)
																			}
																		}
																	)
																}
															})
														}
													})
													fetchDataStopTimes(stop.stop_id).then(r => {
														if (r !== undefined && r.length > 0) {
															setPopupStopTimes(r)
														}
													})
												},
												// 	https://strapi-tandataviz-core.beta.andy-cinquin.fr/stop-times?_limit=-1&stop_id_contains=ABDU
											}}
										>
											<Popup>
												<div className={'flex flex-col'}>
													{/* stop name */}
													<span className={'text-sm font-bold'}>
														{stop.stop_name}
													</span>
													{!isLoadingStopTimes ? (
														<div className={'flex flex-col'}>
															<span className={'text-xs italic text-slate-700'}>
																Ligne : {popupStopLineName}
															</span>
															<span className={'text-xs italic text-slate-700'}>
																Direction : {popupStopHeadsignName}
															</span>
															{/* Type of stops */}
															<span className={'text-xs text-slate-500'}>
																Type :{' '}
																{stop.transport_type?.toUpperCase() || 'BUS'}
															</span>
															{popupWheelchairAccessible && (
																<div className={'flex'}>
																	<span className={'text-xs text-slate-500'}>
																		Accès :{' '}
																	</span>
																	{popupWheelchairAccessible ? (
																		<Image
																			src={'/leaflet/accessible.svg'}
																			width={15}
																			height={15}
																			alt={'wheelchair'}
																		/>
																	) : null}
																</div>
															)}
															{stop.stop_name === 'Hôtel Dieu' && (
																<div className={'my-2 flex'}>
																	<Image
																		src={'/leaflet/streetview/img.png'}
																		width={300}
																		height={300}
																		alt={'street'}
																	/>
																</div>
															)}
															<Link
																className={
																	'mt-2 rounded bg-indigo-700 px-3 py-2 text-xs !text-white'
																}
																href={`https://www.tan.fr/fr/fiche-horaires-ligne-${popupStopLineName.toLowerCase()}`}
															>
																Voir les horaires
															</Link>
														</div>
													) : (
														<div className={'flex flex-col'}>
															<span className={'text-xs italic text-slate-700'}>
																Loading...
															</span>
														</div>
													)}
												</div>
											</Popup>
										</Marker>
									)
								})}
							</>
						)}
					</Map>
				)}
			</section>
		</>
	)
}
