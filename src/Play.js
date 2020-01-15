import React from 'react'
import axios from 'axios'
import ReactFullpage from '@fullpage/react-fullpage' // will return static version on server and "live" version on client
import Logo from './Logo'
const apiURL = 'http://localhost:8081'

class Play extends React.Component {
	render() {
		return (
			<div class='ticketingPage'>
				<Logo />
			</div>
		)
	}
}

export default Play
