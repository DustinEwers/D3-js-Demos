d3.d3Demos = {};

var colors = d3.scale.category10();

d3.d3Demos.piechart = function(){
  // defaults
  var size = "600",
      outerRadius = "290",
      innerRadius = 0; 

      function generator(selection){
        selection.each(function(dataSet) {
			var pie = d3.layout.pie();
			
			//Create SVG element
			var viewBox = "0 0 " + size + " " + size;
			var svg = d3.select(this)
			            .append("svg")
			            .attr("class", "svg-content")
			            .attr("viewBox", viewBox)
			            .attr("preserveAspectRatio", "xMinYMin meet");

			var arc = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius);

            var arcs = svg.selectAll("g.arc")
		        .data(pie(dataSet))
		        .enter()
		        .append("g")
		        .attr("class", "arc")
		        .attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")");

			arcs.append("path").attr("fill", function(d, i) {
			        return colors(i);
			    })
			    .attr("d", arc);

        });
      }

      generator.size = function(value) {
        if (!arguments.length) return size;
        size = value;
        return generator;
      };

      generator.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return generator;
      };

      generator.outerRadius = function(value) {
        if (!arguments.length) return outerRadius;
        outerRadius = value;
        return generator;
      };

      generator.innerRadius = function(value) {
        if (!arguments.length) return innerRadius;
        innerRadius = value;
        return generator;
      };

      return generator;
  };


// Life Expectancy (Years)
var data = [{value: 50, percentage: 11}, {value: 60, percentage: 36}, {value: 70, percentage: 53}];

// Building the Pie Chart
var pieData = data.map(function(x){ return x.percentage; });
var pie = d3.d3Demos.piechart();
d3.select("#pieChart").datum(pieData).call(pie);

// Filling the Legend
data.forEach(function(item, i){
	var button = "<a href='#' class='button tiny' style='background-color:" + colors(i) + ";'>&nbsp</a>";
	$("#pieLegend").append("<li>" + button + " " + item.value + " years (" + item.percentage + "%)</li>");
});
