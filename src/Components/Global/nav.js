import Image from 'next/image'
import React from 'react'

export function Nav(props) {
	const handleChangeFilterSelected = props.handleChangeFilterSelected
	const [filterSelected, setFilterSelected] = React.useState(
		props.filterSelected
	)

	return (
		<div
			className={'flex h-full w-full flex-col bg-sky-950 py-10 text-slate-50'}
		>
			<div className={'flex w-[170px] flex-col'}>
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
			<div className={'flex h-full w-full items-end justify-center px-4'}>
				<div className={'flex flex-col items-center justify-center gap-4 '}>
					<button
						className={
							'flex flex-col items-center justify-center gap-3 ' +
							(filterSelected === 'bus' || filterSelected === 'all')
								? 'opacity-100'
								: 'opacity-50'
						}
						onClick={() => {
							handleChangeFilterSelected('bus')
							filterSelected === 'bus'
								? setFilterSelected('all')
								: setFilterSelected('bus')
						}}
					>
						<div className={'flex w-full justify-center'}>
							<Image
								src={'/leaflet/bus-stop.svg'}
								width={'35'}
								height={'35'}
								alt={'logo'}
							></Image>
						</div>
						<p className={'pt-2 text-center text-xs'}>Bus Stop</p>
					</button>
					<button
						className={
							'flex w-full flex-col items-center justify-center gap-3 ' +
							(filterSelected === 'tram' || filterSelected === 'all')
								? 'opacity-100'
								: 'opacity-50'
						}
						onClick={() => {
							handleChangeFilterSelected('tram')
							filterSelected === 'tram'
								? setFilterSelected('all')
								: setFilterSelected('tram')
						}}
					>
						<div className={'flex w-full justify-center'}>
							<Image
								src={'/leaflet/tram-stop.svg'}
								width={'35'}
								height={'35'}
								alt={'logo'}
							></Image>
						</div>
						<p className={'pt-2 text-center text-xs'}>Tram Stop</p>
					</button>
					<button
						className={
							'flex w-full flex-col items-center justify-center gap-3 ' +
							(filterSelected === 'navibus' || filterSelected === 'all')
								? 'opacity-100'
								: 'opacity-50'
						}
						onClick={() => {
							handleChangeFilterSelected('navibus')
							filterSelected === 'navibus'
								? setFilterSelected('all')
								: setFilterSelected('navibus')
						}}
					>
						<div className={'flex w-full justify-center'}>
							<Image
								src={'/leaflet/navibus-stop.svg'}
								width={'35'}
								height={'35'}
								alt={'logo'}
							></Image>
						</div>
						<p className={'pt-2 text-center text-xs'}>Navibus Stop</p>
					</button>
					<button
						className={
							'flex w-full flex-col items-center justify-center gap-3 ' +
							(filterSelected === 'busway' || filterSelected === 'all')
								? 'opacity-100'
								: 'opacity-50'
						}
						onClick={() => {
							handleChangeFilterSelected('busway')
							filterSelected === 'busway'
								? setFilterSelected('all')
								: setFilterSelected('busway')
						}}
					>
						<div className={'flex w-full justify-center'}>
							<Image
								src={'/leaflet/busway-stop.svg'}
								width={'35'}
								height={'35'}
								alt={'logo'}
							></Image>
						</div>
						<p className={'pt-2 text-center text-xs'}>Busway Stop</p>
					</button>
					<button
						className={
							'flex w-full flex-col items-center justify-center gap-3 ' +
							(filterSelected === 'navette' || filterSelected === 'all')
								? 'opacity-100'
								: 'opacity-50'
						}
						onClick={() => {
							handleChangeFilterSelected('navette')
							filterSelected === 'navette'
								? setFilterSelected('all')
								: setFilterSelected('navette')
						}}
					>
						<div className={'flex w-full justify-center'}>
							<Image
								src={'/leaflet/navette-stop.svg'}
								width={'35'}
								height={'35'}
								alt={'logo'}
							></Image>
						</div>
						<p className={'pt-2 text-center text-xs'}>Navette Stop</p>
					</button>
				</div>
			</div>
		</div>
	)
}
