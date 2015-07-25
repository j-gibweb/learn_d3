import d3 from 'd3';

export function drawExoplanets(data) {
  d3.select('#chartArea').select('svg').remove(); // lazily kill the last rendering

  var width = 600;
  var height = 800;
  var svg = d3.select('#chartArea').append('svg')
    .attr('width', width)
    .attr('height', height)
    

  var investorDataTuplesArray = Object.keys(data).map((investorName) => {
    return [investorName, data[investorName].reduce((accumulator, recordOfInvestment) => { 
      return accumulator += recordOfInvestment.amount
    }, 0)]
  })

  var scale = d3.scale.linear()
    .domain([1, d3.max(investorDataTuplesArray)[1]])
    .range([2, 3])
    .nice();

  svg.selectAll('circle')
    .data(investorDataTuplesArray)
    .enter().append("circle")
    .attr("cy", function(d, i) { 
      return 60 * (Math.floor((i) / 6) + 1); 
    })
    .attr("cx", function(d, i) { 
      var x = i - (Math.floor(i / 6) * 6) // start over every 6 indexes
      return ((x * 100) + 50); 
    })
    .attr("r", 1)
    .transition()
    .duration(800)
    .attr("r", function(d) { 
      // console.log(Math.sqrt(d[1])); 
      return scale(d[1]); 
    });


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