import { SlicePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {Chart} from 'angular-highcharts';
// import * as Chart from 'chart.js';

// import { ChartOptions, ChartType, ChartDataset, Chart } from 'chart.js';

@Component({
    selector:'dash-board',
    templateUrl:'./dashboard.component.html',
    styleUrls:['./dashboard.component.css']
})

export class dashboard{
    currentVersion = '3.2.1';
    inRevision = '3.2.2';

    lineChart2 = new Chart({
      chart:{
        type: 'line',
        style:{
          height:350,
          marginTop:20
        }
      },
      title:{
        text:'Number of Revisions',
        style:{
          fontWeight: "bold"
        }
      },
      credits:{
        enabled: false
      },
      series:[{
        name: 'Number of Revisions',
        data: [10,2,3,6,9,17,20,10,5,2,16]
      }as any]
    })

    pieChart = new Chart({
      chart:{
        type: 'pie',
          height:120,
          width:150
      },
      title:{
        text:'',
        
      },
      credits:{
        enabled: false
      },
      series:[{
        name: 'Roles',
        data: [{name: 'Admin', y: 1},
      {name: 'Commitee Chair', y: 5},
    {name:'Commitee Members', y:8},
    {name:'Stakeholders', y:20}
  ]
      }as any]
    })

    pieChart2 = new Chart({
      chart:{
        type: 'pie',
          height:120,
          width:100
      },
      title:{
        text:'',
        
      },
      credits:{
        enabled: false
      },
      series:[{
        name: 'Roles',
        data: [{name: 'Pending Curriculums', y: 1},
      {name: 'Pending Revisions', y: 5},
    {name:'Active Curriculums', y:8},
    {name:'Approved Revisions', y:20}
  ]
      }as any]
    })

}