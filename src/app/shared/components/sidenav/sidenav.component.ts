import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
<<<<<<< HEAD
import { ContentManagementComponent } from 'src/app/content/components/content-management/content-management.component';
=======
import { combineLatest, map, tap } from 'rxjs';
import { User } from 'src/app/core/models/user';
>>>>>>> 51fbebd694b62d2e07447ccd7c96c857e0aaa430
import { AuthService } from 'src/app/core/services/auth.service';
import { ContentService } from 'src/app/core/services/content.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
<<<<<<< HEAD
  
  click(){
    console.log('asdads');
  }
=======
>>>>>>> 51fbebd694b62d2e07447ccd7c96c857e0aaa430

  constructor(private route: ActivatedRoute, 
              private authService: AuthService,
              private router: Router,
<<<<<<< HEAD
              public dialog: MatDialog
    ) { }
=======
              private contentService: ContentService
    ){}
    
  showSideNav = false
  // currentUser = this.authService.currentUser$
  // currentUser$ = this.authService.getCurrentUser().pipe(
  //   tap(user => console.log(user)
  //   )
  // )

  neededData$ = combineLatest([
    this.authService.getCurrentUser(),
    this.authService.currentUser$,
    
  ]).pipe(
    map(([x, user]) => {
      return user
    })
  )
  
  logo: string = ''
  title:string = ''
  contentData$ = combineLatest([
    this.contentService.content$,
    this.contentService.contentAction$
  ]).pipe(
      tap(([x, content]) => {
        this.title = content.title_text
        this.logo = content.logo_path
      })
    ).subscribe()
>>>>>>> 51fbebd694b62d2e07447ccd7c96c857e0aaa430
  
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
