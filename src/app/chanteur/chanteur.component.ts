import { Component, OnInit, Input } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { promise } from 'protractor';

@Component({
  selector: 'app-chanteur',
  templateUrl: './chanteur.component.html',
  styleUrls: ['./chanteur.component.css']
})

export class ChanteurComponent implements OnInit {
  @Input() chanteur: Promise<any>;
  chart;

  constructor() {}

  ngOnInit() {
    //console.log("debut : " + JSON.stringify(this.chanteur))
    this.chart = am4core.create("chartdiv", am4charts.PieChart);
    this.chanteur.then(Response => this.updateCharts(Response));
  }

  updateCharts(data : []){
    this.chart.data = data;
    this.drawChart();
  }

  drawChart(){
    let series = this.chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "sum";
    series.dataFields.category = "membername";
  }
}

