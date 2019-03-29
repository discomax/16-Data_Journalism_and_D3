// @TODO: YOUR CODE HERE!

// When the browser loads, loadChart() is called
//loadChart();

// Define theh SVG area dimensions
var svgWidth = window.innerWidth;
var svgHeight = window.innerHeight;

// Define the charts margins
var chartMarg = {
    top: 15,
    bottom: 15,
    right: 15,
    left: 15,
};

// Use above to define overall chart area.
var chartWidth = svgWidth - chartMarg.left - chartMarg.right;
var chartHeight = svgHeight - chartMarg.top - chartMarg.bottom;

// Append svg area to "scatter"
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", chartHeight)
    .attr("width", chartWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMarg.left}, ${chartMarg.top})`);

// Append a div to the body to create tooltips, assign it a class
var div = d3.select(".scatter").append("div").attr("class", "tooltip").style("opacity", 0);

// Load data from data.csv
d3.csv("assets/data/data.csv", function(error, censusData) {
    if (error) return console.warn(error);

    console.log(censusData);

    // Cast the desired values to a number for each piece requring it
    censusData.forEach(function(data) {
        data.abbr = data.abbr;
        data.poverty = +data.poverty;
        data.income = +data.income;
        data.smokes = +data.smokes;
        data.age = +data.age;
        data.state = data.state;
    });

    // Create code to build the scater plot using censusData
    
    chartGroup.selectAll("#scatter")
        .data(censusData)
        .enter()
        .append("circle")
        .classed("circle", true)
        .attr("cx", d => d.poverty)
        .attr("cy", d => d.smokes)
        .attr("r", d => d.income / 1000)
        

    chartGroup.selectAll("text")
        .data(censusData)
        .enter()
        .append("text")
        .text(d => d.abbr);

    
        

});

