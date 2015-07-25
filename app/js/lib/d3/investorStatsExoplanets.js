import d3 from 'd3';

export function drawExoplanets(data) {
  d3.select('#chartArea').select('svg').remove(); // lazily kill the last rendering

  var width = 600;
  var height = 800;
  var svg = d3.select('#chartArea').append('svg')
    .attr('width', width)
    .attr('height', height)
    

  var investorNames = Object.keys(data);

  var investorDataTuplesArray = investorNames.map((investor) => {
    return [investor, data[investor].reduce((accum, record) => { return accum += record.amount}, 0)]
  })
  // console.log(investorDataTuplesArray)


  var scale = d3.scale.linear()
    .domain([10, d3.max(investorDataTuplesArray)[1]])
    .range([10, 30])
    .nice();

  // console.log(scale(7500000))

  svg.selectAll('circle')
    .data(investorDataTuplesArray)
    .enter().append("circle")
    .attr("cy", function(d, i) { console.log(`${d}`); return 60; })
    .attr("cx", function(d, i) { console.log(`${d[1]}`); return i * 100 + 30; })
    .attr("r", function(d) { console.log(Math.sqrt(d[1])); return scale(d[1]); });


  // var circle = d3.selectAll("circle");
  // circle.style("fill", "steelblue");
  // circle.attr("r", 30);
  // circle.attr("cx", function() { return Math.random() * 300; });
  // circle.data([10, 20 ,30]);
  // circle.attr("r", function(d) { return d; });
}


// <svg width="720" height="120">
//   <circle cx="40" cy="60" r="10"></circle>
//   <circle cx="80" cy="60" r="10"></circle>
//   <circle cx="120" cy="60" r="10"></circle>
// </svg>