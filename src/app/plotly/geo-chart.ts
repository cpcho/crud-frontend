import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var Plotly: any;

@Component({
   selector: 'geo-chart',
//    template:`<div id="chartWrapper" style="width:100%" #chartWrapper align="center"></div>`
    template: `<div id="graphDiv"></div>`
})
export class GeoChart implements OnInit {
    // @ViewChild('chartWrapper') el: ElementRef;

    ngOnInit() {
        this.generateChart();
    }

    generateChart() {
        // const element = this.el.nativeElement;

    Plotly.d3.json('https://sb13-gse00014870.uscom-east-1.oraclecloud.com/api/all', function(err, rows){

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    let mapBoxApiKey = 'pk.eyJ1IjoiY29tcHJvY2hvIiwiYSI6ImNqaDNrYXF2djBkaG0ycmw1dnIxaTU5NG8ifQ.PaQSqDNIbAeyFN1tEHO5Ew';

    var cityName = unpack(rows, 'name'),
        cityPop = unpack(rows, 'pop'),
        cityLat = unpack(rows, 'lat'),
        cityLon = unpack(rows, 'lon'),
        color = [,"rgb(0,116,217)","rgb(255,65,54)","rgb(133,20,75)","rgb(255,133,27)","lightgrey"],
        
        citySize = [],
        hoverText = [],
        scale = 200000;

    for ( var i = 0 ; i < cityPop.length; i++) {
        var currentSize = cityPop[i] / scale;
        var currentText = cityName[i] + " popuplation: " + cityPop[i];
        citySize.push(currentSize);
        hoverText.push(currentText);
    }

    var data = [{
        type: 'scattermapbox',
        mode: 'markers',
        lat: cityLat,
        lon: cityLon,
        hoverinfo: 'text',
        text: hoverText,
        marker: {
            size: citySize,
            line: {
                color: 'black',
                width: 2
            },
        }
    }];

    var layout = {
        title: '2014 US City Populations',
        font: {color: 'white'},
        dragmode: 'zoom',
        mapbox: {
            center: {
                lat: 39.8283, 
                lon: -98.5795
            },
            style: 'dark',
            zoom: 3,
            domain: {
                x: [0, 1], 
                y: [0, 1]
            }
        },
        margin: {
            r: 15, 
            t: 30, 
            b: 15, 
            l: 10, 
            pad: 0
        },
        paper_bgcolor: '#191A1A', 
        plot_bgcolor: '#191A1A',
        showlegend: false,
        annotations: [{
            x: 0,
            y: 0,
            xref: 'paper',
            yref: 'paper',
            text: 'Source: <a href="https://plot.ly/javascript/bubble-maps/" style="color: rgb(255,255,255)">Plotly</a>',
            showarrow: false
        }],
    };
    Plotly.setPlotConfig({
        mapboxAccessToken: 'pk.eyJ1IjoiY29tcHJvY2hvIiwiYSI6ImNqaDNrYXF2djBkaG0ycmw1dnIxaTU5NG8ifQ.PaQSqDNIbAeyFN1tEHO5Ew'
      })
    Plotly.plot('graphDiv', data, layout);
});
    }

    
} 