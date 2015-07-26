import { default as React } from 'react'
import { default as Router } from 'react-router-component'
import { Link } from 'react-router-component'

import { apiKey } from '../../../secret.js'
import { MatterMarkApi } from '../lib/mattermark_api/mattermarkApi'
import { drawBarChart } from '../lib/d3/companyStatsBarChart'
import { drawPack } from '../lib/d3/investorStatsPack'
import { companiesResponse, companyResponse, fundingsResponse } from '../lib/mattermark_api/fakeData'


let Locations = Router.Locations
let Location = Router.Location
let mmApi = new MatterMarkApi({apiKey: apiKey})

let App = React.createClass({
  getInitialState: function() {
    return {}
  },
  render: function() {
    return (
      <div>
      	<Locations hash>
          <Location path="/investors" handler={Investors} />
      	  <Location path="/companies" handler={Companies} />
      	  <Location path="/companies/:id" handler={Company} />
      	  <NotFound handler={NotFoundPage} />
      	</Locations>
      </div>
      );
  }
});

let Investors = React.createClass({
  getInitialState: function() {
    return {
      data: {}
    }
  },
  componentWillMount: function() {
    var vcTable = {}
    fundingsResponse.fundings.forEach((investmentRecord) => {
      investmentRecord.investors.split(',').forEach((investor) => {
        !vcTable[investor] ? vcTable[investor] = [investmentRecord] : vcTable[investor].push(investmentRecord)
      })
    })
    this.setState({data: vcTable})
  },
  componentDidMount: function() {
    drawPack(this.state.data)
  },
  render: function() {
    let investors = Object.keys(this.state.data).map((investor) => { 
      return (
        <h4><Investor name={investor} data={this.state.data[investor]} /></h4>
        )
    })
    return (<div></div>)
  }
})

let Investor = React.createClass({
  getInitialState: function() {
    return {
      totalInvestments: 0
    }
  },
  componentWillMount: function() {
    // console.log(this.props.data)
    var totalInvestments = this.props.data.reduce((accum, record) => { return accum += record.amount}, 0)
    // console.log(totalInvestments)
    this.setState({
      totalInvestments: totalInvestments
    })
  },
  render: function() {
    return (
      <div>
        {this.props.name} {this.state.totalInvestments}
      </div>
      )
  }
})

let Companies = React.createClass({
  getInitialState: function() {
    return {
      companies: [],
      loading: true
    }
  },
  componentWillMount: function() {
  	setTimeout(() => {
	  	let arr = [].slice.call(companiesResponse.companies)
	  	this.setState({
	  		companies: arr,
	  		loading: false
	  	})	
  	}, 1000)
		
		// mmApi.getCompanies().then((resp) => {
		// 	this.setState({
		// 		companies: resp.companies,
		// 		loading: false
		// 	})
		// })
  },
  render: function() {

    let companies = this.state.companies.map((company) => {
    	return (
  		<h4>
  			<Link href={"/companies/" + company.id}>
  				{company.company_name}
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

let Company = React.createClass({
  getInitialState: function() {
    return {
    	info: {},
    	loading: true
  		}
  },
  handleClick: function(event) {
    console.log(this.props, this.state)
  },
  mixins : [Router.Navigation],
  componentWillMount: function() {
  	// setTimeout(() => {
	  // 	this.setState({
	  // 		info: companyResponse[0],
	  // 		loading: false
	  // 	})
	  // 	drawBarChart(this.state.info.growth_scores)
  	// }, 10)

  	mmApi.getCompany(this.props.id).then((resp) => {
  		if (resp.growth_scores.length === 0) {
        alert(`${resp.company_name } has no growth score stats :(`)
        window.location.replace('#/companies')
      }
  		this.setState({
	  		info: resp,
	  		loading: false
  		})
			drawBarChart(this.state.info.growth_scores)
  	})
  },
  componentDidMount: function() {
  },
  render: function() {
    return (
      <div>
    		{this.state.loading ? <Loading /> : <Chart metric_name={"Growth Scores"} company_name={this.state.info.company_name} />}
      </div>
    )
  }
})

let Loading = React.createClass({
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

let Chart = React.createClass({
  render: function() {
    return (
      <div>
        <h2>{this.props.metric_name}</h2>
        <h3>{this.props.company_name}</h3>
        <div id="chartArea"></div>
      </div>
    )
  }
})

let NotFound = Router.NotFound
let NotFoundPage = React.createClass({
  render: function() {
    return (
      <div>
        Nobody here
      </div>
    )
  }
})

React.render(<App />, document.getElementById('app'));
