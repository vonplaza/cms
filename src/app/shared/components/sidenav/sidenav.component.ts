import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentManagementComponent } from 'src/app/content/components/content-management/content-management.component';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  
  click(){
    console.log('asdads');
  }

  showSideNav = false
  constructor(private route: ActivatedRoute, 
              private authService: AuthService,
              private router: Router,
              public dialog: MatDialog
    ) { }
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const query = params['showSidenav'];
      this.showSideNav = query
    });
  }

  logout(){
    this.authService.logout().subscribe(
      data => this.router.navigate(['/login'])
    )
  }

  openContentManagement() {
    const dialogRef = this.dialog.open(ContentManagementComponent);
  }
}
