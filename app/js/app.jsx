import { apiKey } from '../../secret.js'
import { MatterMarkApi } from './mattermarkApi'
import { drawStats } from './showCompanyStats'
import { default as React } from 'react'

let mmApi = new MatterMarkApi({apiKey: apiKey})

let companiesResponse = {companies: [
	{id: "10161332", url: "https://api.mattermark.com/companies/10161332", company_name: "startangels.ch", domain: "startangels.ch"}
	,{id: "10161350", url: "https://api.mattermark.com/companies/10161350", company_name: "qvanteq.com", domain: "qvanteq.com"}
	,{id: "10161284", url: "https://api.mattermark.com/companies/10161284", company_name: "ankaramasoz.masajevde.com", domain: "ankaramasoz.masajevde.com"}
	,{id: "10161247", url: "https://api.mattermark.com/companies/10161247", company_name: "wuem.eu", domain: "wuem.eu"}
	,{id: "10161388", url: "https://api.mattermark.com/companies/10161388", company_name: "tozzl.com", domain: "tozzl.com"}
	,{id: "10161302", url: "https://api.mattermark.com/companies/10161302", company_name: "hitmine.fi", domain: "hitmine.fi"}
	,{id: "10168387", url: "https://api.mattermark.com/companies/10168387", company_name: "BuddiezApp.com", domain: "buddiezapp.com"}
	,{id: "10168389", url: "https://api.mattermark.com/companies/10168389", company_name: "drugnews.net", domain: "drugnews.net"}
	,{id: "10168391", url: "https://api.mattermark.com/companies/10168391", company_name: "labs.inqbation.com", domain: "labs.inqbation.com"}
	,{id: "10163186", url: "https://api.mattermark.com/companies/10163186", company_name: "carpetcleaning-bermondsey.co.uk", domain: "carpetcleaning-bermondsey.co.uk"}
]}


let App = React.createClass({
  getInitialState: function() {
    return {
      companies: []
    }
  },
  componentDidMount: function() {
  	let arr = [].slice.call(companiesResponse.companies)
  	this.setState({companies: arr})
		
		// mmApi.getCompanies().then((resp) => {
		// 	console.log("promise", resp)
		// 	this.setState({companies: resp.companies})
		// })
  },
  render: function() {
    let companies = []
    this.state.companies.forEach(function(company) {
      companies.push(<Company id={company.id} company_name={company.company_name} />)
    })
    return (
      <div>
      	{companies}
      </div>
      );
  }
});

let Company = React.createClass({
  getInitialState: function(){
    return {id: 101010, company_name: "pets.com"}
  },
  render: function() {
    return (
      <div>
        <h4 className='text-success'>{this.props.id} - {this.props.company_name}</h4>
      </div>
    )
  }
})

React.render(<App />, document.getElementById('app'));