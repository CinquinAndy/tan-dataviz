import Image from 'next/image'
import React from 'react'

export function Nav() {
	return (
		<div className={'flex h-full w-1/5 flex-col bg-sky-950 p-10 text-slate-50'}>
			<div className={'flex w-full items-center justify-center'}>
				<Image
					src={'/telecommuting.svg'}
					width={'35'}
					height={'35'}
					alt={'logo'}
				></Image>
			</div>
			<h2
				className={'mt-3 flex items-center justify-center text-center text-xs'}
			>
				TaN
				<br />
				Dataviz
			</h2>
		</div>
	)
}
