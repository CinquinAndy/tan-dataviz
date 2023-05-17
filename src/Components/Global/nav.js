import Image from 'next/image'
import React from 'react'

export function Nav() {
	return (
		<div
			className={'flex h-full w-full flex-col bg-sky-950 py-10 text-slate-50'}
		>
			<div className={'flex w-[150px] flex-col'}>
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
			<div className={'flex h-full w-full items-end justify-start px-4'}>
				<div className={'flex flex-col gap-4 '}>
					<div className={'flex items-center justify-start gap-2'}>
						<Image
							src={'/leaflet/bus-stop.svg'}
							width={'35'}
							height={'35'}
							alt={'logo'}
						></Image>
						<p className={'text-xs'}>Bus Stop</p>
					</div>
					<div className={'flex items-center justify-start gap-2'}>
						<Image
							src={'/leaflet/tram-stop.svg'}
							width={'35'}
							height={'35'}
							alt={'logo'}
						></Image>
						<p className={'text-xs'}>Tram Stop</p>
					</div>
					<div className={'flex items-center justify-start gap-2'}>
						<Image
							src={'/leaflet/navibus-stop.svg'}
							width={'35'}
							height={'35'}
							alt={'logo'}
						></Image>
						<p className={'text-xs'}>Navibus Stop</p>
					</div>
					<div className={'flex items-center justify-start gap-2'}>
						<Image
							src={'/leaflet/busway-stop.svg'}
							width={'35'}
							height={'35'}
							alt={'logo'}
						></Image>
						<p className={'text-xs'}>Busway Stop</p>
					</div>
					<div className={'flex items-center justify-start gap-2'}>
						<Image
							src={'/leaflet/navette-stop.svg'}
							width={'35'}
							height={'35'}
							alt={'logo'}
						></Image>
						<p className={'text-xs'}>Navette Stop</p>
					</div>
				</div>
			</div>
		</div>
	)
}
