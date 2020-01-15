const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const ApiDocumentation = require('api_documentation')

const app = express()
const port = 8081

const walletInstance = new ApiDocumentation.WalletControllerApi()
const issuerInstance = new ApiDocumentation.IssuerControllerApi()

app.use(bodyParser.json())
app.use(cors())

app.listen(port, () => {
	console.log(`listen on port ${port}`)
})

app.post('/login', async (req, res) => {
	try {
		// res.setHeader('Access-Control-Allow-Origin', '*')
		console.log(req.body)
		const loginResponse = await login(req.body)
		if (loginResponse == 'null') {
			throw Exception('Bad Request.')
		}
		console.log(loginResponse)
		res.status(200).send(loginResponse)
	} catch (e) {
		res.status(400).send('Bad Request.')
	}
})

const login = async params => {
	return new Promise((resolve, reject) => {
		var opts = {
			id: params.id,
			key: params.key,
			did: params.did,
			masterDid: 'masterDid'
		}

		const callback = function(error, data, response) {
			if (error) {
				console.error('...Call Login API failed')
				console.log(error)
				return reject('null')
			} else {
				console.log('...Call Login API successfully.')
				return resolve(response.body)
			}
		}
		walletInstance.loginUsingGET(opts, callback)
	})
}

app.post('/createCredential', async (req, res) => {
	try {
		res.setHeader('Access-Control-Allow-Origin', '*')
		console.log('PARAMS')
		console.log(req.body)
		const ccResponse = await createCredential(req.body)
		if (ccResponse == 'null') {
			throw Exception('Bad Request.')
		}
		res.status(200).send('Good')
	} catch (e) {
		res.status(400).send('Bad Request.')
	}
})

const createCredential = async params => {
	return new Promise((resolve, reject) => {
		const callback = function(error, data, response) {
			if (error) {
				console.error('...Call createCredential API failed')
				console.log(error)
				return reject('null')
			} else {
				console.log('...Call createCredential API successfully.')
				console.log(response.data)
				console.log('-------------------------------------------')
				console.log(response)
				return resolve(response.status)
			}
		}
		issuerInstance.issuerEmailCreatedCredentialsUsingPUT(params, callback)
	})
}

app.post('/createTicket', async (req, res) => {
	try {
		res.setHeader('Access-Control-Allow-Origin', '*')
		const createTicketRes = await createTicket(req.body)
		if (createTicketRes == 'null') {
			throw Exception('Bad Request.')
		}
		res.status(200).send('Good')
	} catch (e) {
		res.status(400).send('Bad Request.')
	}
})

const createTicket = async params => {
	console.log(params)
	return new Promise((resolve, reject) => {
		var opts = {
			credDefId: 'Th7MpTaRZVRYnPiabds81Y:3:CL:557:Tag1', // String | credDefId
			email: params.email, // String | email
			issuerDid: 'Th7MpTaRZVRYnPiabds81Y', // String | issuerDid
			issuerWalletId: 'dominik', // String | issuerWalletId
			issuerWalletKey: 'dominik', // String | issuerWalletKey
			name: params.id, // String | name
			proverDid: params.did, // String | proverDid
			proverWalletId: params.id, // String | proverWalletId
			proverWalletKey: params.key, // String | proverWalletKey
			ticketLevel: params.ticketLevel // String | ticketLevel
		}

		var callback = function(error, data, response) {
			if (error) {
				console.error(error)
				return reject(null)
			} else {
				console.log('API called successfully.')
				return resolve(response.status)
			}
		}
		issuerInstance.issuerEmailCreatedTicketCredentialsUsingPUT(opts, callback)
	})
}
