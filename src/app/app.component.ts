import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  title = 'cict-curriculum-system';
   body = document.querySelector('body');
   
  toggleDarkMode(){
    
    if (this.body) {
            this.body.classList.add('theme-dark');
            this.body.classList.remove('theme-light');
            console.log('set as dark');
            
        
    }
  }

  toggleLightMode(){
    
    if (this.body) {
            this.body.classList.add('theme-light');
            this.body.classList.remove('theme-dark');
            console.log('set as light');
        }
    }
  }
  

