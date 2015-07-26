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
    .range([5, 70])
    .nice();

  var color = d3.scale.quantize().range(["#34495e", "#16a085", "#27ae60", "#2980b9", "#e67e22", "#e74c3c"]);

  var size = 700;
  var pack = d3.layout.pack()
    .sort(null)
    .size([size, size])
    .value(function(d) { return d.amount * d.amount; })
    .padding(25);

  var svg = d3.select('#app').append("svg")
    .attr("width", size)
    .attr("height", size);

  d3.select('#app').select('svg').append("text").attr('x', 100).attr('y', 60)

  color.domain(d3.extent(investorDataTuplesArray, function(d) { return d.amount; }));

  svg.selectAll("circle")
    .data(pack.nodes({children: investorDataTuplesArray}).slice(1))
    .enter().append("circle")
    .attr("r", 1)
    .on("mouseover", function(d) {
      d3.select("text").text(`${d.name} - $${ simpleMoney(d.amount)}`)
      d3.select(this).transition()
        .duration("300")
        .attr("r", function() {
          return d.amount < 10000000 ? scale(d.amount) * 2 : scale(d.amount) * 1.5
        })
        .style("fill", (d) => { return "#f1c40f"})
    })
    .on("mouseout", function(d) {
      d3.select(this).transition()
        .duration("300")
        .attr("r", scale(d.amount))
        .style("fill", function(d) { return color(d.amount); })
    })
    .transition()
    .duration(1000)
    .attr("r", (d) => { return scale(d.amount); })
    .attr("cx", function(d, i) { 
      return d.x; 
    })
    .attr("cy", function(d, i) { return d.y; })
    .style("fill", function(d) { return color(d.amount); })
}



var simpleMoney = (money) => {
  if (money >= 1000000) {
    return (money / 1000000) + "M"
  } else {
    return String(money).split("").reverse().join("").match(/.{1,3}/g).join(",").split("").reverse().join("") // LOL insert commas
  }
}







