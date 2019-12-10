import { Component, OnInit, Input } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";

@Component({
  selector: 'app-all-songs-of-all-albums-of-eminem',
  templateUrl: './all-songs-of-all-albums-of-eminem.component.html',
  styleUrls: ['./all-songs-of-all-albums-of-eminem.component.css']
})
export class AllSongsOfAllAlbumsOfEminemComponent implements OnInit {
  @Input() allSongsOfAllAlbumsOfEminem : Promise<any>;
  chart;
  networkSeries;

  constructor() { }

  ngOnInit() {
    this.chart = am4core.create("chartdivAllSongsOfAllAlbumsOfEminem", am4plugins_forceDirected.ForceDirectedTree);
    this.networkSeries = this.chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())
    this.allSongsOfAllAlbumsOfEminem.then(Response => this.updateCharts(Response));
  }

  updateCharts(data : []){
    this.chart.data = data;
    console.log(data);
    this.drawChart();
  }

  drawChart(){
    //this.networkSeries.dataFields.value = "value";
    //this.networkSeries.dataFields.name = "name";
    //this.networkSeries.dataFields.children = "albums";
    //this.networkSeries.nodes.template.tooltipText = "{name}:{value}";
    this.networkSeries.nodes.template.fillOpacity = 1;
    this.networkSeries.manyBodyStrength = -20;
    this.networkSeries.links.template.strength = 0.8;
    this.networkSeries.minRadius = am4core.percent(2);

    //this.networkSeries.nodes.template.label.text = "{name}"
    this.networkSeries.fontSize = 10;
  }
}
