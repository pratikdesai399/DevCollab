import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../store'
import Nav from '../components/Nav/Nav'
import '../styles/globals.css'
import AuthWrapper from '../components/Auth/AuthWrapper'
import Script from 'next/script'
import FetchWrapper from '../components/Tickets/FetchWrapper'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<FetchWrapper>
				<AuthWrapper>
					<Component {...pageProps} />
					<Script src='https://kit.fontawesome.com/5ddea7c676.js' crossOrigin='anonymous'></Script>
				</AuthWrapper>
			</FetchWrapper>
		</Provider>
	)
}

export default MyApp
