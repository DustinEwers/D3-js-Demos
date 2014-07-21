        var dataSet = [];
        var height = 300;
        var width = 900;
        var index = 0;

        // Build the overall SVG container
        var svg = d3.select("#chartContainer")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);

        $(document).ready(function () {
            $("#radius").on("change", function () {
                $("#radiusValue").text($(this).val());
            });

            $("#height").on("change", function () {
                $("#heightValue").text($(this).val());
            });

            $("#radius").change();
            $("#height").change();

            $("form").on("submit", function () {
                index++;

                var item = {
                    Radius: $("#radius").val(), 
                    Height: $("#height").val(),
                    Index: index
                }

                dataSet.push(item);
                if (dataSet.length > 20) {
                    dataSet.shift();
                }

                bindData();

                return false;
            });
        });

        function bindData() {
            var xScale = d3.scale
                           .ordinal()
                           .domain(d3.range(dataSet.length))
                           .rangeBands([25, width - 25], 0.1);

            var prettyColors = [
                '#000033',
                '#000044',
                '#000055',
                '#000066',
                '#000077',
                '#000088',
                '#000099',
                '#0000AA',
                '#0000BB',
                '#0000CC'];

            var selection = svg.selectAll("circle")
                               .data(dataSet, function (item) { return item.Index });

            selection
               .exit()
               .transition()
               .attr("cx", function (item, i) { return width })
               .attr("cy", function (item, i) { return height })
               .attr("r", function (item) { return 0 })
               .attr("fill", function (item) { return "#000000" })
               .duration(1000)
               .remove();

            selection
               .enter()
               .append("circle")
               .attr("cx", function (item, i) { return width })
               .attr("cy", function (item, i) { return height - item.Height })
               .attr("r", function (item) { return item.Radius })
               .on("click", function (item) { alert(generateMessage(item));});

            selection
               .transition()
               .duration(1000)
               .attr("cx", function (item, i) { return xScale(i) })
               .attr("cy", function (item, i) { return height - item.Height })
               .attr("r", function (item) { return item.Radius })
               .attr("fill", function (item, i) { return prettyColors[item.Index % (prettyColors.length - 1)] });

            function generateMessage(item) {
                var msg = "Index: " + item.Index + " Height: " + item.Height + " Radius: " + item.Radius;
                return msg;
            }
        }