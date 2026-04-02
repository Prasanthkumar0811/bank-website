import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthserviceService } from '../../core/services/authservice.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-applications',
  imports: [CommonModule,MatCardModule,MatButtonModule,MatIconModule,
    MatProgressSpinnerModule,MatDialogModule
  ],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css'
})
export class ApplicationsComponent {

  applications:any[]=[]
  isLoading:boolean=false;
  loggedUser=JSON.parse(localStorage.getItem('loggedUser') || '{}');

  constructor(private authService:AuthserviceService,private dialog:MatDialog){}

  ngOnInit(){
    this.loggedUser.role === 'Customer' ? this.getMyApplication() : this.getAllApplications()

  }
  getAllApplications():void{
    this.isLoading=true
    this.authService.getall().subscribe({
      next:(res)=>{
        if(res.result === true){
          this.applications=res.data
          this.isLoading=false
        }
           
      },
      error:(err)=>{
        this.isLoading=false;
      }
    })
  }
  getMyApplication():void{
    this.isLoading=true
    this.authService.getmy(this.loggedUser.userId).subscribe({
      next:(res)=>{
        if(res.result === true){
          this.isLoading=false;
          this.applications=res.data
        }
      },
      error:()=>{
        this.isLoading=false
      }
    })
  }
  openDialog(app:any):any{
    this.dialog.open(DialogComponent,{
      width:'480px',
      data:app
    })
  }
  getStatusClass(status: string): string {
    if (status === 'Approve') return 'status-approve';
    if (status === 'Reject')  return 'status-reject';
    return 'status-pending';
  }
}
