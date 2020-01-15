import React from 'react'
import axios from 'axios'
import Logo from './Logo'
import './Issuer.css'

import { serverIP } from './config.js'

class Issuer extends React.Component {
	constructor() {
		super()
		this.state = {
			issuerUsername: '',
			issuerPassword: '',
			issuerDID: '',
			proverUsername: '',
			proverPassword: '',
			proverEmail: '',
			proverName: '',
			proverDob: 0,
			proverPoints: 0
		}
	}

	handleLogin = e => {
		e.preventDefault()
		const { issuerUsername, issuerPassword, issuerDID } = this.state
		const loginCreds = {
			id: issuerUsername,
			key: issuerPassword,
			did: issuerDID,
			masterDid: 'masterSecretId'
		}
		console.log(loginCreds)

		axios({
			method: 'POST',
			url: `${serverIP}login`,
			data: loginCreds
		})
			.then(response => console.log(response))
			.then(() => {
				console.log('Logged In Successfully.')
				this.toggleProverPage()
			})
			.catch(response => {
				console.log(response.data)
				alert('Bad Request.')
			})
	}

	handleCreateCredential = e => {
		e.preventDefault()
		const {
			proverUsername,
			proverPassword,
			proverName,
			proverDob,
			proverPoints,
			proverEmail,
			credDefID,
			issuerDID,
			issuerUsername,
			issuerPassword
		} = this.state

		const creds = {
			credDefId: credDefID, // String | credDefId
			dateOfBirth: proverDob, // String | dateOfBirth
			issuerDid: issuerDID, // String | issuerDid
			issuerWalletId: issuerUsername, // String | issuerWalletId
			issuerWalletKey: issuerPassword, // String | issuerissuerWalletKey
			licenceLevel: 2, // Number | licenceLevel
			name: 'name_example', // String | name
			proverWalletId: 'proverWalletId_example', // String | proverWalletId
			proverWalletKey: 'proverWalletKey_example', // String | proverWalletKey
			// issuer
			issuerDid: issuerDID,
			issuerWalletId: issuerUsername,
			issuerWalletKey: issuerPassword,
			// prover
			credDefId: credDefID,
			proverWalletId: proverUsername,
			proverWalletKey: proverPassword,
			email: proverEmail,
			name: proverName,
			dateOfBirth: proverDob,
			licenceLevel: proverPoints
		}
		axios({
			method: 'POST',
			url: `${serverIP}createCredential`,
			data: creds
		})
			.then(res => {
				if (res.status != 200) {
					alert('Bad Request.')
				} else {
					console.log('new masterDID: ', res.data.masterSecretId)
					alert(
						'License created successfully. Check your email for your secret ID!'
					)
				}
			})
			.catch(response => {
				console.log(response)
				alert('Bad request.')
			})
	}

	toggleProverPage = () => {
		const loginBox = document.getElementById('login')
		const proverBox = document.getElementById('prover')
		loginBox.style.display = 'none'
		proverBox.style.display = 'block'
	}

	handleChange = e => {
		const { name, value } = e.target
		this.setState({
			[name]: value
		})
	}

	render() {
		return (
			<div>
				<div className='logo-container'>
					<Logo></Logo>
				</div>
				<div id='login' className='input-container'>
					<div className='load'></div>

					<h2>Issuer Log In</h2>
					<form onSubmit={this.handleLogin}>
						<div class='input-field'>
							<input
								type='text'
								name='issuerUsername'
								onChange={this.handleChange}
								required
							></input>

							<label>Please Enter Your Username.</label>
							<span></span>
						</div>
						<div class='input-field'>
							<input
								type='password'
								name='issuerPassword'
								onChange={this.handleChange}
								required
							></input>

							<label>Please Enter Your Password.</label>
							<span></span>
						</div>
						<div class='input-field'>
							<input
								type='text'
								name='issuerDID'
								onChange={this.handleChange}
								required
							></input>

							<label>Please Enter Your DID.</label>
							<span></span>
						</div>
						<input
							id='button-login'
							type='submit'
							value='Log In'
							name=''
							className='btn'
						></input>
					</form>
				</div>
				<div
					id='prover'
					className='input-container two'
					onSubmit={this.handleCreateCredential}
				>
					<h2>Create User License</h2>
					<form>
						<div class='input-field'>
							<input
								type='text'
								name='credDefID'
								onChange={this.handleChange}
								required
							></input>

							<label>Issuer Enter Cred Def ID.</label>
							<span></span>
						</div>
						<div class='input-field'>
							<input
								type='text'
								name='proverUsername'
								onChange={this.handleChange}
								required
							></input>

							<label>Please Enter Your Username.</label>
							<span></span>
						</div>
						<div class='input-field'>
							<input
								type='password'
								name='proverPassword'
								onChange={this.handleChange}
								required
							></input>

							<label>Please Enter Your Password.</label>
							<span></span>
						</div>
						<div class='input-field'>
							<input
								type='text'
								name='proverName'
								onChange={this.handleChange}
								required
							></input>

							<label>Please Enter Your Name.</label>
							<span></span>
						</div>
						<div class='input-field'>
							<input
								type='email'
								name='proverEmail'
								onChange={this.handleChange}
								required
							></input>

							<label>Please Enter Your Email.</label>
							<span></span>
						</div>
						<div class='input-field'>
							<input
								type='date'
								name='proverDob'
								onChange={this.handleChange}
								required
							></input>

							<label>Please Enter Your Date of Birth.</label>
							<span></span>
						</div>
						<div class='input-field'>
							<input
								type='number'
								name='proverPoints'
								min='0'
								max='15'
								onChange={this.handleChange}
								required
							></input>

							<label>Please Enter Your Penalty Points.</label>
							<span></span>
						</div>
						<input type='submit' value='Submit' name='' className='btn'></input>
					</form>
				</div>
			</div>
		)
	}
}

export default Issuer
