import { SlicePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {Chart} from 'angular-highcharts';
import { AuthService } from "../core/services/auth.service";
import { EMPTY, catchError, combineLatest, map } from "rxjs";
import { CurriculumService } from "../core/services/curriculum.service";
import { CommentService } from "../core/services/comment.service";
import { AccountService } from "../core/services/account.service";

@Component({
    selector:'dash-board',
    templateUrl:'./dashboard.component.html',
    styleUrls:['./dashboard.component.css']
})

export class dashboard implements OnInit{

    constructor(private authService: AuthService,
                private curriculumService: CurriculumService,
                private commentService: CommentService,
                private accountService: AccountService
                ){}
  

  ngOnInit(): void {

  }
    data:any = [
      {name: 'Admin', y: 0},
      {name: 'Commitee Chair', y: 0},
      {name:'Commitee Members', y: 0},
      {name:'Stakeholders', y:0}
    ]
    pieChart!: Chart

    isLoading:boolean = true
    error:boolean = false

    neededData$ = combineLatest([
      this.authService.getCurrentUser(),
      this.curriculumService.curriculums$,
      this.curriculumService.revisions$,
      this.commentService.comments$,
      this.accountService.users$

    ]).pipe(
      map(([user, curriculums, revisions, comments, users]) => {
        this.data = [
          {name: 'Admin', y: users.filter(u => u.role == 'admin').length},
          {name: 'Commitee Chair', y: users.filter(u => u.role == 'chair').length},
          {name:'Commitee Members', y: users.filter(u => u.role == 'faculty').length},
          {name:'Stakeholders', y: users.filter(u => u.role == 'reviewer').length}
        ]
        this.pieChart = new Chart({
          chart:{
            // backgroundColor: '#FCFFC5',
            type: 'pie',
              height:250,
          },
          title:{
            text:'Roles',
            align:'left',
            
          },
          credits:{
            enabled: false
          },
          series:[{
            name: 'Roles',
            data: this.data
          }as any]
          
        })

        this.isLoading = false
        return {
          user: user,
          pendingCurriculums: curriculums.filter(cur => cur.status == 'p').length,
          pendingRevisions: revisions.filter(revision => revision.status == 'p').length,
          activeCurriculums: curriculums.filter(cur => cur.status == 'a').length,
          approvedRevisions: revisions.filter(revision => revision.status == 'a').length,
          latestSubmittedRevisions: revisions.reduce((max, current) => {
            return new Date(current.created_at) > new Date(max.created_at) ? current : max
          }),
          latestComments: comments.slice(-4, -1),
          // latestSubmittedRevisions: revisions.reduce((max, current) => {
          //   return new Date(current.created_at) > new Date(max.created_at) ? current : max
          // }),
          curriculums: curriculums,
          comments: comments.slice(0, 3)
        }
      }),
      catchError(err => {
        this.isLoading = false
        this.error = true
        return EMPTY
      })
    )

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




}