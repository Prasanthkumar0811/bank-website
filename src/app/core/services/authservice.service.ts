import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggedUser, LoginRequest, RegisterRequest } from '../models/auth.model';
import { Observable } from 'rxjs';
import { LoanApplication } from '../models/loan.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private baseurl = environment.apiUrl;

  constructor(private http:HttpClient) { }
  login(payload:LoginRequest):Observable<any>{
    return this.http.post(`${this.baseurl}/api/BankLoan/login`,payload)
  }
  registerCustomer(payload:RegisterRequest):Observable<any>{
    return this.http.post(`${this.baseurl}/api/BankLoan/RegisterCustomer`,payload)
  }
  registerBanker(payload:RegisterRequest):Observable<any>{
    return this.http.post(`${this.baseurl}/api/BankLoan/RegisterAsBankUser`,payload)
  }
  addloan(payload:LoanApplication):Observable<any>{
    return this.http.post(`${this.baseurl}/api/BankLoan/AddNewApplication`,payload)
  }
  getall():Observable<any>{
    return this.http.get(`${this.baseurl}/api/BankLoan/GetAllApplications`)
  }
  getmy(id:any):Observable<any>{
    return this.http.get(`${this.baseurl}/api/BankLoan/GetMyApplications?customerId=${id}`)
  }
  saveUser(user:LoggedUser){
    localStorage.setItem('loggedUser',JSON.stringify(user))
  }
  getUser():LoggedUser | null{
    const data=localStorage.getItem('loggedUser');
    return data ? JSON.parse(data) : null;
  }
  clearUser():void{
    localStorage.removeItem('loggedUser')
  }
  isLoggedIn():boolean{
    return !!localStorage.getItem('loggedUser')
  }

}
