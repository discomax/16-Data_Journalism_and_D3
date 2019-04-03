/*   Data Journalism and D3
     Mike Patterson - 2019      */

/*  *********************************************
    CREATE THE SVG AND CONFIGURE IT FOR THE CHART
    ********************************************* */

//Define the SVG area dimensions
var svgWidth = window.innerWidth;
var svgHeight = window.innerHeight;

// Object to define the charts margins
var chartMarg = {
    top: 50,
    bottom: 100,
    right: 30,
    left: 50,
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

// Append a group to the SVG area, shift to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMarg.left}, ${chartMarg.top})`);

// Append a div to the HTML body to create tooltips, assign it a class
var toolTip = d3.select("#scatter").append("div").attr("class", "tooltip")
    .style("opacity", 0);

/*  *******************************************
    READ THE DATA FROM CSV AND CREATE THE CHART
    *******************************************  */

// Load data from data.csv
d3.csv("./assets/data/data.csv", function(censusData) {

    console.log('censusData: ', censusData);

    // Cast the desired values to a number for each piece requring it
    censusData.forEach(function(data) {
        data.abbr = data.abbr;
        data.poverty = +data.poverty;
        data.income = +data.income;
        data.smokes = +data.smokes;
        data.age = +data.age;
        data.state = data.state;
    });

    // Scale functions
    var xScale = d3.scaleLinear().range([0, chartWidth]);
    var yScale = d3.scaleLinear().range([chartHeight, 0]);

    //Axis functions using the escales
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);



    // Max and min vaues of axis
    var xMax = d3.max(censusData, d => d.poverty);
    var xMin = d3.min(censusData, d => d.poverty);
    var yMax = d3.max(censusData, d => d.smokes);
    var yMin = d3.min(censusData, d => d.smokes);
    console.log(yMax);
    console.log(yMin);
    
    // Domains for x and y axis
    xScale.domain([xMin - 1, xMax]);
    yScale.domain([0, yMax]);

    
    /*  **************************
        PLOT THE DATA ON THE CHART
        ************************** */
    
    chartGroup.append("g").call(leftAxis);
    chartGroup.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);
    // Make circles and plot them
    chartGroup.selectAll(".stateCircle")
        .data(censusData)
        .enter()
        .append("circle")
        .attr("class", "stateCircle")
        .attr("cx", d => xScale(d.poverty))
        .attr("cy", d => yScale(d.smokes))
        .attr("r", 12);

    // Add labels to circles w/ the state abbreviation
    chartGroup.selectAll(".stateText")
        .data(censusData)
        .enter()
        .append("text")
        .attr("class", ".stateText")
        .text(d => d.abbr)
        .attr("x", d => xScale(d.poverty - .15))
        .attr("y", d => yScale(d.smokes))
        .attr("font-size", d => d.income / 4000);
});