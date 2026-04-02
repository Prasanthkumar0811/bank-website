import { Component } from '@angular/core';
import { MatFormFieldModule }        from '@angular/material/form-field';
import { MatInputModule }            from '@angular/material/input';
import { MatButtonModule }           from '@angular/material/button';
import { MatIconModule }             from '@angular/material/icon';
import { MatSelectModule }           from '@angular/material/select';
import { MatDatepickerModule }       from '@angular/material/datepicker';
import { MatNativeDateModule }       from '@angular/material/core';
import { MatProgressSpinnerModule }  from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule }          from '@angular/material/divider';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthserviceService } from '../../core/services/authservice.service';
import { LoanApplication } from '../../core/models/loan.model';
import { P } from '@angular/cdk/keycodes';
@Component({
  selector: 'app-apply-loan',
  imports: [MatFormFieldModule,MatButtonModule,ReactiveFormsModule,MatIconModule,MatSelectModule,
    MatDatepickerModule,MatNativeDateModule,MatProgressSpinnerModule,MatSnackBarModule,
    MatDividerModule,MatInputModule,CommonModule
  ],
  templateUrl: './apply-loan.component.html',
  styleUrl: './apply-loan.component.css'
})
export class ApplyLoanComponent {

  isSubmitting:boolean=false;
  employmentOptions = ['Salaried', 'Self-Employed', 'Business', 'Unemployed'];
  loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
  loanForm!:FormGroup
  constructor(
    private fb:FormBuilder,
    private authService:AuthserviceService,
    private _snackBar:MatSnackBar
  ){}

  ngOnInit(){
    this.loanForm=this.fb.group({
      fullName:         ['', Validators.required],
    panCard:          ['', Validators.required],
    dateOfBirth:      ['', Validators.required],
    email:            ['', [Validators.required, Validators.email]],
    phone:            ['', Validators.required],
    address:          ['', Validators.required],
    city:             ['', Validators.required],
    state:            ['', Validators.required],
    zipCode:          ['', Validators.required],
    annualIncome:     ['', Validators.required],
    employmentStatus: ['', Validators.required],
    creditScore:      ['', Validators.required],
    assets:           ['', Validators.required],
    loans: this.fb.array([this.createLoan()])
    })
  }
  get loans(){
    return this.loanForm.get('loans') as FormArray
  }
  createLoan():FormGroup{
    return this.fb.group({
      loanID:      [0],
      applicantID: [0],
      bankName:    ['', Validators.required],
      loanAmount:  ['', Validators.required],
      emi:         ['', Validators.required],
    })
  }
  addLoan(){
    this.loans.push(this.createLoan())
  }

  removeLoan(i:number):void{
    if(this.loans.length > 1){
      this.loans.removeAt(i)
    }
  }

  onSubmit():void{
    if(this.loanForm.invalid){
      return
    }
    this.isSubmitting=true
    const payload:LoanApplication={
      ...this.loanForm.value,
      applicantID:       0,
      applicationStatus: 'Pending',
      dateApplied:       new Date().toISOString(),
      customerId:        this.loggedUser.userId,
    }
    this.authService.addloan(payload).subscribe({
      next:(res)=>{
        this.isSubmitting=false;
        this.onsuccess('Application created')
        this.loanForm.reset()
      },
      error:(err)=>{
         this.isSubmitting = false;
         this.onsuccess(err?.error?.message || 'Application failed')
      }
    })
  }
  onsuccess(msg:any){
    this._snackBar.open(msg, 'OK', { duration: 4000,verticalPosition: 'top',
    horizontalPosition: 'center' ,panelClass:['mat-warn']
});
}
}