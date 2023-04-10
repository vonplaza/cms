import { Component } from '@angular/core';
import {AppComponent} from 'src/app/app.component';
@Component({
  selector: 'app-content-management',
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.css']
})
export class ContentManagementComponent {
 toggleTheme = new AppComponent();
 isDark=false;
 toggle(){
  if(!this.isDark)
  {
    this.toggleTheme.toggleDarkMode();
  this.isDark = true;
  console.log(this.isDark);
}
  
  else {
  this.toggleTheme.toggleLightMode();
    this.isDark = false;
    console.log(this.isDark);
}

 }

}
