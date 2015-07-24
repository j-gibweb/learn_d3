import { apiKey } from '../secret.js'
import { MatterMarkApi } from './js/mattermarkApi';
import d3 from 'd3';



let mmApi = new MatterMarkApi({apiKey: apiKey})
// console.log(mmApi)
// console.log(mmApi.getCompanies())
// console.log(mmApi.getCompany('10168389'))




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


let companyResponse = {
	"id":10168389,
	"website":"#<Models::Website:0x00000007d53278>",
	"company_name":"drugnews.net",
	"location":"washington d.c.",
	"state":"DC",
	"country":"usa",
	"twitter_handle":null,
	"facebook_slug":null,
	"crunchbase_slug":"drugnews",
	"is_raising":null,
	"est_founding_date":null,
	"stage":"no known funding",
	"total_funding":null,
	"last_funding_date":null,
	"last_funding_amount":null,
	"has_mobile":0,
	"employees":null,
	"employees_month_ago":null,
	"employees_6_months_ago":null,
	"cached_growth_score":null,
	"cached_mattermark":0,
	"cached_uniques":401,
	"cached_uniques_week_ago":237,
	"cached_uniques_month_ago":169,
	"cached_mobile_downloads":null,
	"cached_mobile_downloads_week_ago":null,
	"cached_mobile_downloads_month_ago":null,
	"business_models":null,
	"cached_industries":"healthcare, pharmaceuticals",
	"ipos":[],
	"itunes_apps":[],
	"fundings":[],
	"acquired_by":[],
	"acquired_companies":[],
	"employee_counts":[],
	"growth_scores":[
		{"recorded_at":"2015-07-20 00:00:00 UTC", "score":6},
		{"recorded_at":"2015-07-13 00:00:00 UTC", "score":-12},
		{"recorded_at":"2015-07-06 00:00:00 UTC", "score":-12},
		{"recorded_at":"2015-06-29 00:00:00 UTC", "score":-30},
		{"recorded_at":"2015-06-22 00:00:00 UTC", "score":-28},
		{"recorded_at":"2015-06-15 00:00:00 UTC", "score":-31},
		{"recorded_at":"2015-06-08 00:00:00 UTC", "score":-33},
		{"recorded_at":"2015-06-01 00:00:00 UTC", "score":-50},
		{"recorded_at":"2015-05-25 00:00:00 UTC", "score":-71},
		{"recorded_at":"2015-05-18 00:00:00 UTC", "score":-62},
		{"recorded_at":"2015-05-11 00:00:00 UTC", "score":-54},
		{"recorded_at":"2015-05-04 00:00:00 UTC", "score":-54},
		{"recorded_at":"2015-04-27 00:00:00 UTC", "score":-65},
		{"recorded_at":"2015-04-20 00:00:00 UTC", "score":-51},
		{"recorded_at":"2015-04-13 00:00:00 UTC", "score":-46},
		{"recorded_at":"2015-04-06 00:00:00 UTC", "score":-55},
		{"recorded_at":"2015-03-30 00:00:00 UTC", "score":-66},
		{"recorded_at":"2015-03-23 00:00:00 UTC", "score":-78},
		{"recorded_at":"2015-03-16 00:00:00 UTC", "score":-70},
		{"recorded_at":"2015-03-09 00:00:00 UTC", "score":-78},
		{"recorded_at":"2015-03-02 00:00:00 UTC", "score":-104},
		{"recorded_at":"2015-02-23 00:00:00 UTC", "score":-108},
		{"recorded_at":"2015-02-16 00:00:00 UTC", "score":-168},
		{"recorded_at":"2015-02-09 00:00:00 UTC", "score":-178},
		{"recorded_at":"2015-02-02 00:00:00 UTC", "score":-139},
		{"recorded_at":"2015-01-26 00:00:00 UTC", "score":-76},
		{"recorded_at":"2015-01-19 00:00:00 UTC", "score":-122},
		{"recorded_at":"2015-01-12 00:00:00 UTC", "score":-97},
		{"recorded_at":"2014-12-29 00:00:00 UTC", "score":44},
		{"recorded_at":"2014-11-24 00:00:00 UTC", "score":606}
	],
	"description":"No description available.",
	"domain":"drugnews.net",
	"description_plain_text":"", 
	"people":[]
}


var data = companyResponse.growth_scores.reverse();
var width = 500;
var height = 500;
var svg = d3.select('#chartArea').append('svg')
  .attr('width', width)
  .attr('height', height);

// var yScale = d3.scale.linear()
// 	.domain([0, width])
// 	.range([0, height])


// svg.selectAll('rect')
//   .data(data)
//   .enter()
//   .append('rect')
//   .attr('class', 'bar')
//   .attr('x', function (d, i) {
//     return i * 22;
//   })
//   .attr('y', function (d) {
//   	console.log(d.score, yScale(d.score))
//   	return h - Math.abs(yScale(d.score));	
//   })
//   .attr('width', 20)
//   .attr('height', function (d) {
//   	return Math.abs(yScale(d.score));
//   });


// http://bl.ocks.org/mbostock/2368837
// http://bl.ocks.org/mbostock/7341714

var x0 = Math.max(-d3.min(data, function(d) {return d.score}), 
                  d3.max(data, function(d) {return d.score})
                  );

var x = d3.scale.linear()
    .domain([-x0, x0])
    .range([0, width])
    .nice();

// var x = d3.scale.linear()
//   .domain(d3.extent(data, function(d) {return d.score}))
//   .range([0, width])


var y = d3.scale.ordinal()
    .domain(d3.range(data.length))
    .rangeRoundBands([0, height], .05);


svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", function(d) { return d.score < 0 ? "bar negative" : "bar positive"; })
    .attr("x", function(d, i) { return x(Math.min(0, d.score)) })
    .attr("y", function(d, i) { return y(i); })
    .attr("width", function(d, i) { return Math.abs(x(d.score) - x(0)); })
    .attr("height", y.rangeBand())




console.log(svg.selectAll('g'))

