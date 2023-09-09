//URL setup as variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and console
d3.json(url).then(function(data) {
        console.log(data);
});

// Start dashboard
function init() {
        let dropdownMenu = d3.select("#selDataset");

        // D3 to get names and populate the drop-down selector
        d3.json(url).then((data) => {
                let names = data.names;
                names.forEach((id) => {

                        // print each id in loop
                        console.log(id);
                        dropdownMenu.append("option")
                        .text(id)
                        .property("value", id);
                });

                // Use the first names
                let sample_one = names[0];
                console.log(sample_one);

                // Different plots
                buildMetadata(sample_one);
                buildBarChart(sample_one);
                buildBubbleChart(sample_one);
                buildGaugeChart(sample_one);
        });
};

// Pull the metadata
function buildMetadata(sample) {

        //D3 pull data
        d3.json(url).then((data) => {
                let metadata = data.metadata;
                let value = metadata.filter(result => result.id == sample);
                console.log(value)

                let valueData = value[0];

                // Clear value
                d3.select("#sample-metadata").html("")

                // Adding key and value
                Object.entries(valueData).forEach(([key, value]) => {
                        console.log(key, value);
                        d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
                });
        });
};
         
// Build bar chart
function buildBarChart(sample) {

        // Retrieve tags
         d3.json(url).then((data) => {
                 let sampleInfo = data.samples;
                let value = sampleInfo.filter(result => result.id == sample);
                let valueData = value[0];
                let otu_ids = valueData.otu_ids;
                let otu_labels = valueData.otu_labels;
                let sample_values = valueData.sample_values;

                console.log(otu_ids, otu_labels, sample_values);

                let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
                let xticks = sample_values.slice(0,10).reverse();
                let labels = otu_labels.slice(0,10).reverse();

                // Setup barchart
                let trace = {
                        x: xticks,
                        y: yticks,
                        text: labels,
                        type: "bar",
                        orientation: "h"
                };
                        
                // Layout
                let layout = {
                        title: "Top 10 of the OTUs"
                };

                // Plot bar chart
                Plotly.newPlot("bar", [trace], layout)
        });
};

// Building bubble chart
function buildBubbleChart(sample) {

        // Get data
        d3.json(url).then((data) => {
                let sampleInfo = data.samples;
                let value = sampleInfo.filter(result => result.id == sample);
                let valueData = value[0];

                // Get tags
                let otu_ids = valueData.otu_ids;
                let otu_labels = valueData.otu_labels;
                let sample_values = valueData.sample_values;

                console.log(otu_ids, otu_labels, sample_values);

                // Bubble chart setup
                let trace1 = {
                        x: otu_ids,
                        y: sample_values,
                        text: otu_labels,
                        mode: "markers",
                        marker: {
                                size: sample_values,
                                color: otu_ids,
                                colorscale: "Earth"
                        }
                };

                // Presentation layout
                let layout = {
                        title: "Sample Bacteria",
                        hovermode: "closest",
                        xaxis: {title: "OTU ID"},
                };

                // Plotly for bubble chart
                 Plotly.newPlot("bubble", [trace1], layout)
        });
};

// Build Gauge chart
function buildGaugeChart(sample) {
        //D3 pull data
        d3.json(url).then((data) => {
                let metadata = data.metadata;
                let value = metadata.filter(result => result.id == sample);
                console.log(value)

                let valueData = value[0];
                // Key/Pair placed inot gauge chart
                let washFrequency = Object.values(valueData)[6];

                // setup gauge chart structure
                let trace2 = {
                        domain: {x: [0, 1], y: [0, 1]},
                        value: washFrequency,
                        title: {text: "Belly Button Washing Frequency Scrubs per Week"},
                        type: "indicator",
                        mode: "gauge+number",
                        gauge: {
                                axis: {range:[0,10], tickmode: "linear",tick0: 2, dtick:2},
                                bar: {color: "darkblue"},
                                steps: [
                                        {range: [0, 1], color: "rgba(255, 255, 255, 0)"},
                                        {range: [1, 2], color: "rgba(232, 226, 202, 0.5)"},
                                        {range: [2, 3], color: "rgba(210, 206, 145, 0.5)"},
                                        {range: [3, 4], color: "rgba(202, 209, 95, 0.5)"},
                                        {range: [4, 5], color: "rgba(184, 205, 68, 0.5)"},
                                        {range: [5, 6], color: "rgba(170, 202, 42, 0.5)"},
                                        {range: [6, 7], color: "rgba(142, 178, 35 , 0.5)"},
                                        {range: [7, 8], color: "rgba(110, 154, 22, 0.5)"},
                                        {range: [8, 9], color: "rgba(50, 143, 10, 0.5)"},
                                        {range: [9, 10], color: "rgba(14, 127, 0, 0.5)"},

                                ]
                        }
                };

                // Layout perameters
                let layout = {
                        width: 400,
                        height: 400,
                        margin: {t:0, b:0}
                };

                // Plot Gauge Cahrt
                Plotly.newPlot("gauge", [trace2], layout)
        });
};

// Update dashboard when changes made
function optionChanged(value) {

        // New value
        console.log(value);

        buildMetadata(value);
        buildBarChart(value);
        buildBubbleChart(value);
        buildGaugeChart(value);
};

init();
