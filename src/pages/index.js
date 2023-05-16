import Head from 'next/head'

import Map from '@components/Map'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { gps_coordinates_nantes } from '@/utils/consts'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
	const [isLoadingStopTimes, setIsLoadingStopTimes] = React.useState(true)
	const [popupStopHeadsignName, setPopupStopHeadsignName] = React.useState(null)
	const [popupStopType, setPopupStopType] = React.useState(null)
	const [popupWheelchairAccessible, setPopupWheelchairAccessible] =
		React.useState(null)
	const [popupStopTimes, setPopupStopTimes] = React.useState(null)
	const [iconBus, setIconBus] = React.useState(null)
	const [iconTram, setIconTram] = React.useState(null)
	const [iconBusway, setIconBusway] = React.useState(null)
	const [iconNavibus, setIconNavibus] = React.useState(null)
	const [iconNavette, setIconNavette] = React.useState(null)
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
	}, [])

	const { isLoading, isError, data, error } = useQuery({
		queryKey: ['stops'],
		queryFn: async () => {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/stops?_limit=200`,
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

	const fetchDataStopLimits = async stop_id => {
		// 	`${process.env.NEXT_PUBLIC_API_URL}/stop-times?_limit=-1&stop_id_contains=${stop.stop_id}`
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/stop-times?_limit=1&stop_id_contains=${stop_id}&_sort=trip_id:ASC`,
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
			`${process.env.NEXT_PUBLIC_API_URL}/stop-times?_limit=-11&stop_id_contains=${stop_id}&_sort=trip_id:ASC`,
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
		// 	`${process.env.NEXT_PUBLIC_API_URL}/stop-times?_limit=-1&stop_id_contains=${stop.stop_id}`
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/trips?_limit=1&trip_id=${trip_id}`,
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
		// 	`${process.env.NEXT_PUBLIC_API_URL}/stop-times?_limit=-1&stop_id_contains=${stop.stop_id}`
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/routes?_limit=1&route_id=${route_id}`,
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
				<div
					className={'flex h-full w-1/5 flex-col bg-sky-950 p-10 text-slate-50'}
				>
					<div className={'flex w-full items-center justify-center'}>
						<Image
							src={'/telecommuting.svg'}
							width={'35'}
							height={'35'}
							alt={'logo'}
						></Image>
					</div>
					<h2
						className={
							'mt-3 flex items-center justify-center text-center text-xs'
						}
					>
						TaN
						<br />
						Dataviz
					</h2>
				</div>
				{typeof window !== 'undefined' && (
					<Map
						width="800"
						height="400"
						center={gps_coordinates_nantes}
						scrollWheelZoom={false}
						zoom={16}
					>
						{({ TileLayer, Marker, Popup }) => (
							<>
								<TileLayer
									url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
									attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
								/>
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

									return (
										<Marker
											key={stop.id}
											position={[stop.stop_lat, stop.stop_lon]}
											icon={transport_type_icon}
											eventHandlers={{
												mouseover: event => {
													event.target.openPopup()
													setPopupStopHeadsignName(null)
													setPopupWheelchairAccessible(null)
													setPopupStopType(null)
													setIsLoadingStopTimes(true)
													console.log('stop info global')
													console.log(stop)
													fetchDataStopLimits(stop.stop_id).then(r => {
														if (r !== undefined && r.length > 0) {
															console.log('stop')
															console.log(r)
															setPopupStopType(r[0].transport_type || 'BUS')

															fetchDataTripsLimits(r[0].trip_id).then(r => {
																if (r !== undefined && r.length > 0) {
																	console.log('trip')
																	console.log(r)
																	setPopupStopHeadsignName(r[0].trip_headsign)
																	setPopupWheelchairAccessible(
																		r[0].wheelchair_accessible === 1
																	)
																	fetchDataRoutesLimits(r[0].route_id).then(
																		r => {
																			if (r !== undefined && r.length > 0) {
																				setIsLoadingStopTimes(false)
																				console.log('route')
																				console.log(r[0])
																			}
																		}
																	)
																}
															})
														}
													})
													fetchDataStopTimes(stop.stop_id).then(r => {
														if (r !== undefined && r.length > 0) {
															console.log('stop times')
															console.log(r)
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
																Ligne : {popupStopHeadsignName}
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
