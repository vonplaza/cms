import { SlicePipe } from "@angular/common";
import { Component } from "@angular/core";
import {Chart} from 'angular-highcharts';

@Component({
    selector:'dash-board',
    templateUrl:'./dashboard.component.html',
    styleUrls:['./dashboard.component.css']
})

export class DashBoardComponent{

    currentVersion = '3.2.1';
    inRevision = '3.2.2';

    lineChart2 = new Chart({
      chart:{
        type: 'line',
        style:{
          width:350,
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
          width:500,
          marginRight:100
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

}