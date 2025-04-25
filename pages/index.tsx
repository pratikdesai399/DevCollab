import type { NextPage } from 'next'
import Head from 'next/head'

import Landing from '../components/Landing/Landing'

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>DevCollab</title>
				<meta name="description" content="Developer Project Ticket Management App - developed by Pratik Desai" />
			</Head>

			<Landing />
		</>
	)
}

export default Home
