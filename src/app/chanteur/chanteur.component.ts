import { Component, OnInit, Input } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { promise } from 'protractor';
import { S_IFDIR } from 'constants';

@Component({
  selector: 'app-chanteur',
  templateUrl: './chanteur.component.html',
  styleUrls: ['./chanteur.component.css']
})

export class ChanteurComponent implements OnInit {
  @Input() chanteur: Promise<any>;
  chart;
  leString;
  isTrueBol;
  constructor() {}

  ngOnInit() {
    this.isTrueBol = false;
    //console.log("debut : " + JSON.stringify(this.chanteur))
    this.chart = am4core.create("chartdiv", am4charts.PieChart);
    this.chanteur.then(Response => {
      //Response = this.integrationNameBandsOfArtist(Response)
      //console.log("response : " + Response[0])
      //this.updateCharts(Response);
      return Response;
    }).then(Response => {
      for(var i=0; i<Response.length; i++){
      

          var artistsList = [];
          //console.log("name of artist : " + Response[i].membername)
      
          var fetchVariable = "http://wasabi.i3s.unice.fr/api/v1/member/name/";
          fetchVariable += Response[i].membername;
      
          fetch(fetchVariable).then(results => { 
            return results.json();
          }).then(originalData => {
            //console.log("Valuer  : " + originalData[0].urlWikia)
            artistsList.push(originalData[0].urlWikia)
            //console.log("avant : " + this.createStr(artistsList))
            
            var str : string = "";
            for(var i=0; i<artistsList.length; i++){
              str += artistsList[i];
            }

            this.leString = str;

            //console.log("************ LE string *********** : " + this.leString);
            if (this.leString != "" && this.leString != undefined && this.leString != null){
              //console.log(this.leString)
              Response[i]["bandNames"] = this.leString;
            }
            else{
            Response[i]["bandNames"] = "Non définie";
            }

          });
      }
      //console.log(data)
      return Response;
    }).then(Response => {
      this.updateCharts(Response);
    })
  }

  updateCharts(data : []){
    //data = this.integrationNameBandsOfArtist(data);
    //console.log(JSON.stringify(data))
    this.chart.data = data;
    this.drawChart();
  }

  integrationNameBandsOfArtist(data){
    for(var i=0; i<data.length; i++){
      
      if(this.isTrueBol == false){
        this.leString = this.getBandsOfAnArtist(data[i].membername);
      }
      if(this.isTrueBol == true){
        console.log("apres le string : " + this.leString);
        
        data[i]["bandNames"] = "Problème de thread ....";
        //console.log("data : " + JSON.stringify(data))
      }
   
      
    }
    //console.log(data)
    return data;
  }

  createStr(data){
    //console.log("data : " + data)
    var str : string = "";
    for(var i=0; i<data.length; i++){
      str += data[i];
    }
    //console.log("final str : " + str)
    return str;
  }

  drawChart(){
    let series = this.chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "sum";
    series.dataFields.category = "membername";
    series.slices.template.tooltipText = "{membername} : {sum} ({bandNames})"
  }

  getBandsOfAnArtist(nameOfArtist){
    var artistsList = [];
    console.log("name of artist : " + nameOfArtist)

    var fetchVariable = "http://wasabi.i3s.unice.fr/api/v1/member/name/";
    fetchVariable += nameOfArtist;

    fetch(fetchVariable).then(results => { 
      return results.json();
    }).then(originalData => {
      //console.log("urlWikia : " + originalData[0].urlWikia)
      artistsList.push(originalData[0].urlWikia)
      console.log("avant : " + this.createStr(artistsList))
      this.isTrueBol = true;
      return this.createStr(artistsList);
    });
  }
}

