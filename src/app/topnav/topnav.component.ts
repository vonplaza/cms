import { Component } from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
    selector:'top-nav',
    templateUrl:'./topnav.component.html',
    styleUrls: ['./topNav.component.css']
})

export class topNavigation{
    toggleBtnNavBar = 'menu';
    navToggle = true;
    toggleNavBarIcon(): void{
        this.navToggle = !this.navToggle;
        if(this.navToggle!=false){
            this.toggleBtnNavBar = 'menu';
        }
        else{
            this.toggleBtnNavBar = 'keyboard_arrow_left';
        }
    }
}