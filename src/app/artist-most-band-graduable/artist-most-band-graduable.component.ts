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
  @Input() chanteursMostBandsGraduable : string[];
  chart;
  
  nbMostBandsGraduable = 5;

  constructor(private chanteurService: ChanteurService) {  
  }

  ngOnInit() {
    this.chart = am4core.create("chanteursMostBandsGraduablediv", am4charts.PieChart);

    if(localStorage.getItem("artist_most_band_graduable") == null){
      this.chanteurService.getMostBandsGraduable(this.nbMostBandsGraduable).subscribe((result : any)=>{
        this.chanteursMostBandsGraduable = result;
        this.updateCharts(this.chanteursMostBandsGraduable);
        // *****************   PERSISTENCE *************************///
        localStorage.setItem("artist_most_band_graduable", JSON.stringify(this.chanteursMostBandsGraduable));
      }
      );
    }
    else{
      this.updateCharts(JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem("artist_most_band_graduable")))));
    }

    
  }

  updateTwo(data){
    this.chanteurService.getMostBandsGraduable(this.nbMostBandsGraduable).subscribe((result : any)=>{
      this.chanteursMostBandsGraduable = result;
      this.updateChartsTwo(this.chanteursMostBandsGraduable);
    }
    
  );
  }

  updateChartsTwo(data : string[]){
    this.chart.data = data;
  }

  updateCharts(data : string[]){
    this.chart.data = data;
    this.drawChart();
  }

  drawChart(){
    let series = this.chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "sum";
    series.dataFields.category = "membername";
  }

  onGraduableChange() {
    //console.log(this.nbMostBandsGraduable)
    this.updateTwo(this.nbMostBandsGraduable);
  }
}
