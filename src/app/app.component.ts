import { Component, DoCheck, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  // madilimBa:boolean | undefined;
  // ngDoCheck(): void {
  //   if(!this.madilimBa){
  //     if (this.body) {
  //            this.body.classList.add('theme-light');
  //            this.body.classList.remove('theme-dark');
  //            console.log('putaninang yan'+this.madilimBa);
  //        }
  //      }
  //      else if(this.madilimBa){
  //        if (this.body) {
  //          this.body.classList.add('theme-dark');
  //          this.body.classList.remove('theme-light');
  //          console.log('putaninang mo');
  //      }
  //      }
  // }
  // ngOnInit(): void {
  //   if(!this.madilimBa){
  //    if (this.body) {
  //           this.body.classList.add('theme-light');
  //           this.body.classList.remove('theme-dark');
  //           //console.log('set as light');
  //       }
  //     }
  //     else if(this.madilimBa){
  //       if (this.body) {
  //         this.body.classList.add('theme-dark');
  //         this.body.classList.remove('theme-light');
  //         //console.log('set as light');
  //     }
  //     }
  // }
  title = 'cict-curriculum-system';
   body = document.querySelector('body');
  }
  

