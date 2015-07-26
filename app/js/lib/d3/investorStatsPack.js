import d3 from 'd3';

export function drawPack(data) {
  var investorDataTuplesArray = Object.keys(data).map((investorName) => {
    return {
      "name": investorName, 
      "amount": data[investorName].reduce((accumulator, recordOfInvestment) => { 
        return accumulator += recordOfInvestment.amount
      }, 0)
    }
  })

  var scale = d3.scale.linear()
    .domain([1, d3.max(investorDataTuplesArray, function(d) { return d.amount})])
    .range([5, 100])
    .nice();

  var color = d3.scale.quantize().range(["#34495e", "#16a085", "#27ae60", "#2980b9", "#f1c40f", "#e67e22", "#e74c3c"]);

  var size = 650;
  var pack = d3.layout.pack()
    .sort(null)
    .size([size, size])
    .value(function(d) { return d.amount * d.amount; })
    .padding(20);

  var svg = d3.select('#app').append("svg")
    .attr("width", size)
    .attr("height", size);

  d3.select('#app').select('svg').append("text").attr('x', 100).attr('y', 60)

  color.domain(d3.extent(investorDataTuplesArray, function(d) { return d.amount; }));

  svg.selectAll("circle")
    .data(pack.nodes({children: investorDataTuplesArray}).slice(1))
    .enter().append("circle")
    .attr("r", 1)
    .on("mouseover", (d) => {
      d3.select("text").text(`${d.name} - $${d.amount}`)
    })
    .transition()
    .duration(800)
    .attr("r", function(d) { return scale(d.amount); })
    .attr("cx", function(d, i) { 
      return d.x; 
    })
    .attr("cy", function(d, i) { return d.y; })
    .style("fill", function(d) { return color(d.amount); })

}











