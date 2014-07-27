d3.d3Demos = {};

d3.d3Demos.barchart = function(){
  // defaults
  var width = 900, 
      height = 400,
      margin = {left: 75, bottom: 50, right: 20 },
      maxValue = 100,
      axisLabel = { x: "X Axis", y: "Y Axis"};

      function generator(selection){
        selection.each(function(dataSet) {
          // Actual space for the bars
          var chartWidth = width - (margin.left + margin.right);
          var chartHeight = height - margin.bottom;

          //Building the scale for the heights
          var yScale = d3.scale
                         .ordinal()
                         .domain(dataSet.map(function(item){ return item.y; }))
                         .rangeRoundBands([0, chartHeight], .3);

          //Building the scale for the bar locations
          var xScale = d3.scale
                         .linear()
                         .range([0, chartWidth])
                         .domain([0, maxValue]);

          //Building a Y axis
          var yAxis = d3.svg.axis()
                        .scale(yScale)
                        .orient("left");

          // Building an X Axis
          var xAxis = d3.svg.axis()
                        .scale(xScale)
                        .orient("bottom");

          // Build the overall SVG container
          var svg = d3.select(this)
                      .append("svg")
                      .attr("width", width)
                      .attr("height", height)
                      .attr("class", "chart");

          // Adding the Axes
          svg.append("g")
             .attr("class", "axis")
             .attr("transform", "translate(" + margin.left + ",0)")
             .call(yAxis)
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("dy", "-35px")
              .attr("dx", "-80px")
              .attr("class", "label")
              .style("text-anchor", "end")
              .text(axisLabel.y);

          svg.append("g")
             .attr("class", "axis")
             .attr("transform", "translate(" + margin.left + "," + chartHeight + ")")
             .call(xAxis)
             .append("text")
              .attr("dy", "40px")
              .attr("dx", "475px")
              .attr("class", "label")
              .style("text-anchor", "end")
              .text(axisLabel.x);


          var bars = svg.selectAll("rect")
                        .data(dataSet);
          
          // Build bars for each item
          // Example "rect" element: <rect x="200" y="400" width="300" height="100" style="" class="" />
          bars.enter()
             .append("rect")
             .attr("x", function (item, i) { return margin.left })
             .attr("y", function (item, i) { return yScale(item.y) })
             .attr("width", function (item) { return xScale(item.x) })
             .attr("height", function (item) { return yScale.rangeBand() })
             .attr("fill", "teal");             
        });             
      }

      generator.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return generator;
      };

      generator.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return generator;
      };

      generator.margin = function(value) {
        if (!arguments.length) return width;
        margin = value;
        return generator;
      };

      generator.maxValue = function(value) {
        if (!arguments.length) return height;
        maxValue = value;
        return generator;
      };

      generator.axisLabel = function(value) {
        if (!arguments.length) return height;
        axisLabel = value;
        return generator;
      };

      return generator;
};

// y = # of years, x = % respond
var data = [{y: 50, x: 11}, {y: 60, x: 36}, {y: 70, x: 53}];

var chart1 = d3.d3Demos.barchart()
                       .axisLabel({ x: "% of Respondents", y: "Life Expectancy (Years)" });

d3.select("#question1").datum(data).call(chart1);

// y = % literate, x = % respond
data = [{y: 80, x: 22}, {y: 60, x: 52}, {y: 40, x: 26}];

var chart2 = d3.d3Demos.barchart()
                       .axisLabel({ x: "% of Respondents", y: "Literacy Rate (%)" });

d3.select("#question2").datum(data).call(chart2);

