import { Container } from 'react-bootstrap'
import { Fragment, useEffect, useState } from 'react'
import Constants from '../constants/Constants'
import { useRouter } from 'next/router'
import Link from 'next/link'
import NavBar from '@/components/NavBarComponent'

const HomePage = () => {
	const router = useRouter()

	useEffect(() => {
		const accessToken = localStorage.hasOwnProperty('accessToken')
		if (accessToken) {
			router.push('/datasetstore')
		}
	}, [])

	return (
		<Fragment>
			<Container>
				<div className='cover'>
					<p className='lead'>{Constants.HomeTop}</p>
					<p className='display-5'>
						{Constants.HomeHeader1}<br />
						{Constants.HomeHeader2}<br />
						{Constants.HomeHeader3}
					</p>
					<p className='smalltext my-4'>
						{Constants.HomeIntro1} <br />
						{Constants.HomeIntro2} <br />
					</p>
					<p className='lead'>{Constants.HomeFooter}</p>
					<Link href='/auth' className='btn'>
						Get Started<i className='fa-solid fa-circle-arrow-right'></i>
					</Link>
				</div>
			</Container>
		</Fragment >
	)
}

export default HomePage