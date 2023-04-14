import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  constructor(private route: ActivatedRoute, 
    private authService: AuthService,
    private router: Router
    ) { }
    
  showSideNav = false
  // currentUser = this.authService.currentUser$
  // currentUser$ = this.authService.getCurrentUser().pipe(
  //   tap(user => console.log(user)
  //   )
  // )

  neededData$ = combineLatest([
    this.authService.getCurrentUser(),
    this.authService.currentUser$
  ]).pipe(
    map(([x, user]) => user)
  )
  
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
}
