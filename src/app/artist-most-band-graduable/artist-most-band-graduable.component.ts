import { Component, OnInit, Input  } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

import { ChanteurService } from '../chanteur.service'; 
import { promise } from 'protractor';

@Component({
  selector: 'app-artist-most-band-graduable',
  templateUrl: './artist-most-band-graduable.component.html',
  styleUrls: ['./artist-most-band-graduable.component.css']
})

export class ArtistMostBandGraduableComponent implements OnInit {
  @Input() chanteursMostBandsGraduable;
  chart;
  
  nbMostBandsGraduable = 5;

  constructor(private chanteurService: ChanteurService) {  
  }

  ngOnInit() {
    //console.log("debut : " + JSON.stringify(this.chanteur))
    this.chart = am4core.create("chanteursMostBandsGraduablediv", am4charts.PieChart);

    this.chanteurService.getMostBandsGraduable(this.nbMostBandsGraduable).subscribe((result : any)=>{
      this.chanteursMostBandsGraduable = result;
      this.updateCharts(this.chanteursMostBandsGraduable);
      console.log("Graduade : " + this.chanteursMostBandsGraduable);
    }
    );
  }

  updateTwo(data){
    this.chanteurService.getMostBandsGraduable(this.nbMostBandsGraduable).subscribe((result : any)=>{
      this.chanteursMostBandsGraduable = result;
      this.updateChartsTwo(this.chanteursMostBandsGraduable);
    }
    
  );
  }

  updateChartsTwo(data : []){
    this.chart.data = data;
  }

  updateCharts(data : []){
    //console.log(data)
    this.chart.data = data;
    this.drawChart();
  }

  drawChart(){
    let series = this.chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "sum";
    series.dataFields.category = "membername";
  }

  onGraduableChange() {
    console.log(this.nbMostBandsGraduable)
    this.updateTwo(this.nbMostBandsGraduable);
  }
}
