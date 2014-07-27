(function () {

  var dataSet = [{
                  LiteracyRate: 80,
                  PercentGuessed: 22
                },
                {
                  LiteracyRate: 60,
                  PercentGuessed: 52
                },
                {
                  LiteracyRate: 40,
                  PercentGuessed: 26
                }];

  d3.select("#tagTableBody")
    .selectAll("tr")
    .data(dataSet)
    .enter()
    .append("tr")
    .html(function (dataPoint) {
        var message = "<td>" + dataPoint.LiteracyRate + "</td>";
        message += "<td>" + dataPoint.PercentGuessed + "</td>";
        return message;
    });

})();