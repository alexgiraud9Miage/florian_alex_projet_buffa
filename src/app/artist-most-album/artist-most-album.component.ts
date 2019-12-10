import { Component, OnInit, Input } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

@Component({
  selector: 'app-artist-most-album',
  templateUrl: './artist-most-album.component.html',
  styleUrls: ['./artist-most-album.component.css']
})
export class ArtistMostAlbumComponent implements OnInit {
  @Input() artistWithMostAlbum: Promise<any>;
  chart;

  constructor() { }

  ngOnInit() {
    //console.log("debut : " + JSON.stringify(this.chanteur))
    this.chart = am4core.create("chartdivArtistWithMostAlbum", am4charts.XYChart);
    this.artistWithMostAlbum.then(Response => this.updateCharts(Response));
  }

  updateCharts(data : []){
    this.chart.data = data;
    this.drawChart();
  }

  drawChart(){
    
    console.log("chart data : " + this.chart.data);
    var categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "name";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
      if (target.dataItem && target.dataItem.index) {
        return dy + 25;
      }
      return dy;
    });

    var valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = this.chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "sum";
    series.dataFields.categoryX = "name";
    series.name = "Sum";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;

    var columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;
  }

}
