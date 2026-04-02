import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule,MatIconModule,CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  loggedUser:any
  constructor(private router:Router){
    this.loggedUser=JSON.parse(localStorage.getItem('loggedUser') || '{}')
  }
  handleCTA(){
    if(this.loggedUser.userId){
      this.router.navigate(['/applications'])
    }else{
      this.router.navigate(['/register'])
    }
  }

services = [
    { icon: 'account_balance', title: 'Personal Banking',   desc: 'Tailored solutions to meet your everyday financial needs with ease and confidence.' },
    { icon: 'business',        title: 'Corporate Banking',  desc: 'Empower your business with flexible credit facilities and expert financial advisors.' },
    { icon: 'trending_up',     title: 'Wealth Management',  desc: 'Grow and protect your wealth with our curated investment and advisory services.' },
    { icon: 'show_chart',      title: 'Investment Banking', desc: 'Strategic investments and market insights for maximum portfolio performance.' },
    { icon: 'savings',         title: 'Asset Management',   desc: 'Comprehensive asset allocation strategies tailored to your financial goals.' },
    { icon: 'lock',            title: 'Private Banking',    desc: 'Exclusive, discreet banking services crafted for high net-worth individuals.' },
  ];

   stats = [
    { value: '25+',   label: 'Years of Trust'   },
    { value: '2M+',   label: 'Happy Customers'  },
    { value: '150+',  label: 'Branch Locations' },
    { value: '99.9%', label: 'Uptime Guarantee' },
  ];
}
