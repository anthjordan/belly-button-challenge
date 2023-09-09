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

                // gauge chart
                buildGaugeChart(sample);
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
                                bgcolor: "white",
                                steps: [
                                        {range: [0, 1], color: "rgba(255, 255, 255, 0)"},
                                        {range: [1, 2], color: "rgba(232, 226, 202, 0.5)"},
                                        {range: [2, 3], color: ""},
                                        {range: [3, 4], color: ""},
                                        {range: [4, 5], color: ""},
                                        {range: [5, 6], color: ""},
                                        {range: [6, 7], color: ""},
                                        {range: [7, 8], color: ""},
                                        {range: [8, 9], color: ""},
                                        {range: [9, 10], color: ""},

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

// initiate function
init();