import Head from 'next/head'

import Map from '@components/Map'
import React from 'react'
import Image from 'next/image'
import { gps_coordinates_nantes } from '@/utils/consts'
import { useQuery } from '@tanstack/react-query'
import { log } from 'next/dist/server/typescript/utils'

export default function Home() {
	const { isLoading, isError, data, error } = useQuery({
		queryKey: ['stops'],
		queryFn: async () => {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/stops?_limit=10`,
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
				<Map
					width="800"
					height="400"
					center={gps_coordinates_nantes}
					scrollWheelZoom={false}
					zoom={16}
					onDragend={value => {
						console.log(value)
					}}
				>
					{({ TileLayer, Marker, Popup }) => (
						<>
							<TileLayer
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
								attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
							/>
							{console.log()}
							{data.map(stop => {
								return (
									<Marker
										key={stop.id}
										position={[stop.stop_lat, stop.stop_lon]}
									>
										<Popup>{stop.stop_name}</Popup>
									</Marker>
								)
							})}
						</>
					)}
				</Map>
			</section>
		</>
	)
}
