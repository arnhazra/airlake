import { Container } from 'react-bootstrap'
import { Fragment } from 'react'
import { NextPage } from 'next'
import Constants from '@/constants/Constants'
import Link from 'next/link'

const HomePage: NextPage = () => {
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
					<Link href='/auth' className='btn'>Get Started<i className='fa-solid fa-circle-arrow-right'></i></Link>
				</div>
			</Container>
		</Fragment >
	)
}

export default HomePage