import React from 'react'
import ReactFullpage from '@fullpage/react-fullpage'
import axios from 'axios'
import './Ticketing.css'
import LogoFilled from './LogoFilled.js'

import { serverIP } from './config.js'

export default class Ticketing extends React.Component {
	constructor() {
		super()
		this.state = {
			id: '',
			key: '',
			email: '',
			did: '',
			ticketLevel: '',
			name: ''
		}
	}
	componentDidMount() {
		const signUpButton = document.getElementById('signUp')
		const signInButton = document.getElementById('signIn')
		const container = document.getElementById('container')

		signUpButton.addEventListener('click', () => {
			container.classList.add('right-panel-active')
		})

		signInButton.addEventListener('click', () => {
			container.classList.remove('right-panel-active')
		})
	}

	handleLogin = fullpageApi => {
		axios({
			method: 'POST',
			url: `${serverIP}login`,
			data: this.state
		})
			.then(response => console.log(response))
			.then(() => {
				console.log('Logged In Successfully.')
				fullpageApi.moveSlideRight()
			})
			.catch(response => {
				console.log(response)
				alert('Something went wrong. Please try again.')
			})
	}

	handleCreateTicket = fullpageApi => {
		console.log(this.state)
		axios({
			method: 'POST',
			url: `${serverIP}createTicket`,
			data: this.state
		})
			.then(response => {
				console.log('Create Ticket Successfully.')
				console.log(response)
				// alert('Create Ticket Successfully.')
				fullpageApi.moveSlideRight()
			})
			.catch(err => {
				console.log(err)
				alert('Something went wrong. Please try again.')
			})
	}

	handleChange = e => {
		const { name, value } = e.target
		this.setState({
			[name]: value
		})
	}
	render() {
		return (
			<ReactFullpage
				//fullpage options
				licenseKey={'YOUR_KEY_HERE'}
				scrollingSpeed={1000} /* Options here */
				controlArrows={false}
				render={({ state, fullpageApi }) => {
					return (
						<ReactFullpage.Wrapper>
							<div className='section'>
								<div className='slide'>
									<div class='ticketingPage'>
										<div class='container' id='container'>
											<div class='form-container sign-up-container'>
												<div className='form'>
													<h1>Create Account</h1>
													<span>We will send you your personal DID soon!</span>
													<br />

													<input
														className='ticketing-input'
														name='id'
														type='text'
														placeholder='Username'
														onChange={this.handleChange}
													/>
													<input
														className='ticketing-input'
														name='key'
														type='password'
														placeholder='Password'
														onChange={this.handleChange}
													/>
													<input
														className='ticketing-input'
														name='name'
														type='text'
														placeholder='Name'
														onChange={this.handleChange}
													/>
													<input
														className='ticketing-input'
														name='email'
														type='email'
														placeholder='Email'
														onChange={this.handleChange}
													/>

													<br />

													<button
														onClick={() => fullpageApi.moveSlideRight()}
														id='Create an account'
													>
														Create an account
													</button>
												</div>
											</div>
											<div class='form-container sign-in-container'>
												<div className='form'>
													<h1>Login for ticket</h1>

													<span>
														powered by <LogoFilled className='power-logo' />
													</span>
													<br />
													<input
														className='ticketing-input'
														name='id'
														type='text'
														placeholder='Username'
														onChange={this.handleChange}
													/>
													<input
														className='ticketing-input'
														name='key'
														type='password'
														placeholder='Password'
														onChange={this.handleChange}
													/>
													<input
														className='ticketing-input'
														name='email'
														type='email'
														placeholder='Email'
														onChange={this.handleChange}
													/>
													<input
														className='ticketing-input'
														name='did'
														type='text'
														placeholder='Your DID'
														onChange={this.handleChange}
													/>

													<a href='#'>Forgot your password?</a>
													<button
														id='Log in'
														onClick={() => this.handleLogin(fullpageApi)}
													>
														Sign In
													</button>
												</div>
											</div>
											<div class='overlay-container'>
												<div class='overlay'>
													<div class='overlay-panel overlay-left'>
														<h1>Welcome Back!</h1>
														<p>
															To buy your ticket with us please login with your
															personal info.
														</p>
														<button class='ghost' id='signIn'>
															Sign In
														</button>
													</div>
													<div class='overlay-panel overlay-right'>
														<h1>Don't have an account?</h1>
														<p>
															Enter your personal details and get your ticket
															with us.
														</p>
														<button class='ghost' id='signUp'>
															Create an account
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className='slide'>
									<div class='ticketingPage'>
										<div class='container payment' id='container'>
											<div class='form-container payment'>
												<button
													id='back-button'
													onClick={() => fullpageApi.moveSlideLeft()}
												>
													x
												</button>
												<div className='form'>
													<h1>Payment Details</h1>
													<span>Enter your credit card information</span>
													<br />
													<input
														className='ticketing-input'
														name='ticketLevel'
														type='text'
														placeholder='Ticket Level'
														onChange={this.handleChange}
													/>
													<input
														className='ticketing-input'
														name='cardName'
														type='text'
														placeholder='Name on card'
														onChange={this.handleChange}
													/>
													<input
														className='ticketing-input'
														name='cardNumber'
														type='number'
														placeholder='Card Number'
														onChange={this.handleChange}
													/>
													<input
														className='ticketing-input'
														name='cardExpDate'
														type='text'
														placeholder='Expiration Date'
														onChange={this.handleChange}
													/>
													<input
														className='ticketing-input'
														name='CVC'
														type='password'
														placeholder='CVC'
														onChange={this.handleChange}
													/>
													<br />

													<button
														onClick={() => this.handleCreateTicket(fullpageApi)}
														id='Purchase your ticket'
													>
														Purchase your ticket
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className='slide'>
									<div class='ticketingPage'>
										<div class='container payment' id='container'>
											<div class='form-container payment'>
												<button
													id='back-button'
													onClick={() => fullpageApi.moveSlideLeft()}
												>
													x
												</button>
												<div className='form'>
													<h1>You have purchased the ticket successfully!</h1>
													<span>
														We will send you a confirmation email soon.
													</span>
													<br />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</ReactFullpage.Wrapper>
					)
				}}
			/>
		)
	}
}
