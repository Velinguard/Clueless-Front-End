import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'

import Ticketing from './Ticketing'
import Issuer from './Issuer'

class App extends React.Component {
	render() {
		return (
			<Router>
				<Route exact path='/' component={Issuer} />
				<Route exact path='/ticketing' component={Ticketing} />
			</Router>
		)
	}
}

export default App
