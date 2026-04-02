import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Route, Router, RouterModule } from '@angular/router';
import { MatButtonModule }                     from '@angular/material/button';
import { MatIconModule }                       from '@angular/material/icon';
import { MatToolbarModule }                    from '@angular/material/toolbar';
import { AuthserviceService } from '../../../core/services/authservice.service';
import { filter } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterModule,MatButtonModule,MatIconModule
    ,MatToolbarModule,MatSnackBarModule,MatProgressSpinnerModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private authService:AuthserviceService,private router:Router,
    private _snackBar:MatSnackBar
  ) { }
  isLoggedIn:boolean=false;
  userName:string='';
  role:string='';
  isLoading:boolean=false;

ngOnInit(){
  this.router.events
    .pipe(filter(e=>e instanceof NavigationEnd))
    .subscribe(()=>this.checkAuth())
}

  checkAuth(){
    const user=this.authService.getUser()
    if(user){
      this.isLoggedIn= !!user;
      this.userName=user?.userName ?? '';
      this.role=user?.role ?? ''
    }
  }

  logOut(){
    this.isLoading=true;
    this.authService.clearUser()
    this.isLoggedIn=false
    this.userName=''
    this.role=''
    this.onsuccess('Loggedout Sucessfully')
    setTimeout(() => {
      this.isLoading=false
      this.router.navigate(['/home'])
    }, 1000);
    
  }
   onsuccess(msg:any){
    this._snackBar.open(msg, 'OK', { duration: 4000,verticalPosition: 'top',
    horizontalPosition: 'center' ,panelClass:['mat-warn']
});
}
}
