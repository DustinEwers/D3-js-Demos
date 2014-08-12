        (function () {
            var data = [0, 5, 120, 150, 20, 40, 80, 100, 150, 200];
            var dates = [new Date('1/1/2014'), new Date('1/15/2014'), new Date('2/1/2014'), new Date('2/15/2014'), new Date('3/1/2014')];

            // Overall dimensions of the SVG
            var height = 300;
            var width = 900;

            // Linear Scale
            var linearScale = d3.scale
                           .linear()
                           .range([0, height-10])
                           .domain([0, d3.max(data)])
                           .nice();

            // Ordinal Scale
            var ordinalScale = d3.scale
                           .ordinal()
                           .domain(d3.range(data.length))
                           .rangeBands([0, height-10]);

            // Time Scale
            var timeScale = d3.time.scale()
                            .domain([d3.min(dates), d3.max(dates)])
                            .range([height - 10, 0]);
            
            //Linear Axis
            var linearAxis = d3.svg.axis()
                          .scale(linearScale)
                          .orient("left")
                          .ticks(5);

            //Ordinal Axis
            var ordinalAxis = d3.svg.axis()
                          .scale(ordinalScale)
                          .orient("right");

            // Time Axis
            var timeAxis = d3.svg.axis()
                            .scale(timeScale)
                            .orient("left")
                            .tickFormat(d3.time.format("%m/%d/%Y"));

            // Build the overall SVG container
            var svg = d3.select("#chartContainer")
                        .append("svg")
                        .attr("width", width)
                        .attr("height", height);

            // Adding the Axes
            svg.append("g")
               .attr("class", "axis")
               .attr("transform", "translate(50,5)")
               .call(linearAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("dy", "-30px")
                .attr("dx", "-140px")
                .attr("class", "label")
                .style("text-anchor", "end")
                .text("Linear Axis");

            svg.append("g")
               .attr("class", "axis")
               .attr("transform", "translate(150,5)")
               .call(ordinalAxis)
               .append("text")
                .attr("transform", "rotate(-90)")
                .attr("dy", "-30px")
                .attr("dx", "-140px")
                .attr("class", "label")
                .style("text-anchor", "end")
                .text("Ordinal Axis");

            svg.append("g")
               .attr("class", "axis")
               .attr("transform", "translate(275,5)")
               .call(timeAxis)
               .append("text")
                .attr("transform", "rotate(-90)")
                .attr("dy", "-75px")
                .attr("dx", "-140px")
                .attr("class", "label")
                .style("text-anchor", "end")
                .text("Time Axis");
        })();