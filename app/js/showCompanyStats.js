import d3 from 'd3';

export function drawStats(data) {
	d3.select('#chartArea').select('svg').remove(); // lazily kill the last rendering

	var width = 600;
	var height = 800;
	var svg = d3.select('#chartArea').append('svg')
	  .attr('width', width)
	  .attr('height', height);

	var x0 = Math.max(-d3.min(data, function(d) {return d.score}), d3.max(data, function(d) {return d.score}));

	var x = d3.scale.linear()
	    .domain([-x0, x0])
	    .range([0, width])
	    .nice();

	var y = d3.scale.ordinal()
	    .domain(d3.range(data.length))
	    .rangeRoundBands([0, height], .1);

	var bar = svg.selectAll("g")
	  .data(data)
		.enter().append("g");

	bar.append("rect")
	  .attr("class", function(d) { return d.score < 0 ? "bar negative" : "bar positive"; })
	  .attr("x", function(d, i) { return x(Math.min(0, d.score)) })
	  .attr("y", function(d, i) { return y(i); })
	  .attr("height", y.rangeBand())
	  .attr("width", 5)
	  .transition()
	  .duration(500)
	  .attr("width", function(d, i) { return Math.abs(x(d.score) - x(0)); })
	  

	var textDy = "1.2em";
	var textColor = '#ecf0f1';

	bar.append("text")
	  .attr("x", function(d, i) { return x(Math.min(0, Math.abs(d.score))) })
	  .attr("y", function(d, i) { return y(i); })
	  .attr("dy", textDy)
	  .text(function(d) { return d.score; })
	  .attr('fill', textColor);

	bar.append("text")
		.attr("x", function(d, i) { return 5; })
	  .attr("y", function(d, i) { return y(i); })
	  .attr("dy", textDy)
	  .text(function(d) { return d.recorded_at.slice(0, 10); })
	  .attr('fill', textColor);

}

// http://bl.ocks.org/mbostock/2368837
// http://bl.ocks.org/mbostock/7341714