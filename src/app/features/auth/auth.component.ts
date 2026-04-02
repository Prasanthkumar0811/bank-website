import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule, FormBuilder,
  FormGroup, Validators,
  AbstractControl, ValidationErrors,
  Form,
} from '@angular/forms';
import { MatFormFieldModule }         from '@angular/material/form-field';
import { MatInputModule }             from '@angular/material/input';
import { MatButtonModule }            from '@angular/material/button';
import { MatCheckboxModule }          from '@angular/material/checkbox';
import { MatIconModule }              from '@angular/material/icon';
import { MatProgressSpinnerModule }   from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../core/services/authservice.service';
import { LoggedUser } from '../../core/models/auth.model';
@Component({
  selector: 'app-auth',
  imports: [CommonModule,ReactiveFormsModule,MatFormFieldModule,MatSnackBarModule,MatProgressSpinnerModule,
    MatIconModule,MatButtonModule,MatCheckboxModule,MatInputModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  isLoginMode:boolean=true;
  isSubmitting:boolean=false;
  selectedRole:string='';
  hidePassword:boolean=true;
  hideConfirmPass:boolean=true

  loginForm!:FormGroup
  registerForm!:FormGroup
  constructor(private fb:FormBuilder,private router:Router,
    private authService:AuthserviceService,private _snackBar:MatSnackBar
  ) {
  }
  ngOnInit(){
    this.loginForm=this.fb.group({
      userName:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(8)]]
    })

    this.registerForm=this.fb.group({
      fullName:['',[Validators.required,Validators.minLength(3)]],
      userName:['',[Validators.required,Validators.minLength(3)]],
      emailId:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]],
      confirmPassword:['',[Validators.required]],
      terms:[false,Validators.requiredTrue]
    },{validators:this.passwordmatch})
  }

   passwordmatch(group:AbstractControl){
    const pass=group.get('password')?.value;
    const confirmpass=group.get('confirmPassword')?.value
    return pass === confirmpass ? null : {passwordMismatch:true}
  }

  toggleMode(){
    this.isLoginMode =!this.isLoginMode
    this.hideConfirmPass=true;
    this.hidePassword=true;
    this.selectedRole=''
    this.loginForm.reset()
    this.registerForm.reset()
  }
  setRole(role:string){
    this.selectedRole=role
  }

  onLogin():void{
    if(this.loginForm.invalid){
      return
    }
    this.isSubmitting=true

    this.authService.login(this.loginForm.value).subscribe({
      next:(res)=>{
        if (!res.result) {
          this.isSubmitting=false;
          this.onsuccess(res.message || 'Login failed.');
          return;
        }
        const {userId, userName, role}=res.data
        this.authService.saveUser({userId,userName,role} as LoggedUser)
        this.onsuccess('Login Sucessful');
        setTimeout(() => { 
                        this.isSubmitting=false;
                   // 👈 delay navigation
    if (role === 'Customer') {
      this.router.navigate(['/apply-loan']);
    } else {
      this.router.navigate(['/applications']);
    }
  }, 1500);     
      },
      error:(err)=>{
        this.isSubmitting=false;
        this.onsuccess(err?.error?.message || 'Login Failed')
      }
    })
  }

  onRegister():void{
    if(this.registerForm.invalid || !this.selectedRole){
      return
    }
    this.isSubmitting=true

    const {confirmPassword,terms, ...rest}=this.registerForm.value
    const payload={userId:0,...rest};

    const api$=this.selectedRole === 'Customer' ? this.authService.registerCustomer(payload) :
    this.authService.registerBanker(payload)

    api$.subscribe({
      next:(res)=>{
        if (!res.result) {
    this.isSubmitting=false;
    this.onsuccess(res.message || 'Registration failed.');
    return;
  }
        this.onsuccess('Account created! , Please login')
       setTimeout(() => {  
                this.isSubmitting=false
                        // 👈 delay toggle
    this.toggleMode();
  }, 1500);
      },
      error:(err)=>{
        this.isSubmitting=false;
        this.onsuccess(err.error?.message  || 'Registration failed')
      }
    })
  }
 onsuccess(msg:any){
    this._snackBar.open(msg, 'OK', { duration: 4000,verticalPosition: 'top',
    horizontalPosition: 'center' ,panelClass:['mat-warn']
});
}
}
