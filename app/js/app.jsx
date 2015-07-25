import { apiKey } from '../../secret.js'
import { MatterMarkApi } from './mattermarkApi'
import { drawStats } from './showCompanyStats'
import { default as React } from 'react'
import { default as Router } from 'react-router-component'
import { Link } from 'react-router-component'

import { companiesResponse, companyResponse } from './fakeData'

var Locations = Router.Locations
var Location = Router.Location

var mmApi = new MatterMarkApi({apiKey: apiKey})

var App = React.createClass({
  getInitialState: function() {
    return {}
  },
  render: function() {
    return (
      <div>
      	<Locations hash>
      	  <Location path="/companies" handler={Companies} />
      	  <Location path="/companies/:id" handler={Company} />
      	  <NotFound handler={NotFoundPage} />
      	</Locations>
      </div>
      );
  }
});

var Companies = React.createClass({
  getInitialState: function() {
    return {
      companies: [],
      loading: true
    }
  },
  componentDidMount: function() {
  	setTimeout(() => {
	  	let arr = [].slice.call(companiesResponse.companies)
	  	this.setState({
	  		companies: arr,
	  		loading: false
	  	})	
  	}, 1000)
		
		// mmApi.getCompanies().then((resp) => {
		// 	console.log("promise", resp)
		// 	this.setState({
		// 		companies: resp.companies,
		// 		loading: false
		// 	})
		// })
  },
  render: function() {

    let companies = this.state.companies.map((company) => {
    	return (
  		<h4 className='text-success'>
  			<Link href={"/companies/" + company.id}>
  				{company.id} - {company.company_name}
  			</Link>
  		</h4>
    	)
    })
    return (
      <div>
      	{companies}
      	{this.state.loading ? <Loading /> : null}
      </div>
    );
  }
});


var Company = React.createClass({
  getInitialState: function() {
    return {
    	info: {},
    	loading: true
  		}
  },
  handleClick: function(event) {
    console.log(this.props, this.state)
  },
  componentWillMount: function() {
  	// setTimeout(() => {
  	// 	console.log(companyResponse[0])
	  // 	this.setState({
	  // 		info: companyResponse[0],
	  // 		loading: false
	  // 	})
	  // 	drawStats(this.state.info.growth_scores)
  	// }, 10)

  	mmApi.getCompany(this.props.id).then((resp) => {
  		if (resp.growth_scores.length === 0) alert(`${resp.company_name } has no growth score stats :(`)
  		this.setState({
	  		info: resp,
	  		loading: false
  		})
			drawStats(this.state.info.growth_scores)
  	})
  },
  componentDidMount: function() {
  },
  render: function() {
    return (
      <div>
    		{this.state.loading ? <Loading /> : <Chart company_name={this.state.info.company_name} />}
      </div>
    )
  }
})


var Loading = React.createClass({
  render: function() {
    return (
      <div>
        <div className="loading">
        	<div className="gps_ring"></div>
        </div>
      </div>
    )
  }
})

var Chart = React.createClass({
  render: function() {
    return (
      <div>
        <h3>growth_scores : {this.props.company_name}</h3>
        <div id="chartArea"></div>
      </div>
    )
  }
})

var NotFound = Router.NotFound
var NotFoundPage = React.createClass({
  render: function() {
    return (
      <div>
        Nobody here
      </div>
    )
  }
})

React.render(<App />, document.getElementById('app'));
