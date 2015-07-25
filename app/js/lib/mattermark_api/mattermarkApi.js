import { default as reqwest } from 'reqwest' // this === var reqwest = require('reqwest') 

export class MatterMarkApi {
	constructor(options) {
		this.apiKey = options.apiKey
	}
	getCompanies() {
		let url = `${this.baseURL}/companies?key=${this.apiKey}`
	  return this.makeRequest(url)
	}
	getCompany(id) {
		let url = `${this.baseURL}/companies/${id}?key=${this.apiKey}`
	  return this.makeRequest(url)
	}
	makeRequest(url) {
		return reqwest({
			url: url,
			method: 'get',
			success: (resp) => {
				return resp
			},
			error: (error) => {
				console.log("WHOOPSIES", resp)
				return false
			}
		})
	}
}

// immutable property declaration
Object.defineProperty(MatterMarkApi.prototype, "baseURL", {"value": "https://api.mattermark.com"})