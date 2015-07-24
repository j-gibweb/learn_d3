export class MatterMarkApi {
	constructor(options) {
		this.apiKey = options.apiKey;	
	}
	getCompanies() {
		var url = `${this.baseURL}/companies?key=${this.apiKey}`
	  return this.makeRequest(url)
	}
	getCompany(id) {
		var url = `${this.baseURL}/companies/${id}?key=${this.apiKey}`
	  return this.makeRequest(url)
	}
	makeRequest(url) {
		var xmlHttp = new XMLHttpRequest()
		xmlHttp.open( "GET", url, false )
		xmlHttp.send( null )
		return JSON.parse(xmlHttp.responseText)
	}
}

// immutable property declaration
Object.defineProperty(MatterMarkApi.prototype, "baseURL", {"value": "https://api.mattermark.com"})