import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AuthComponent } from './features/auth/auth.component';
import { ApplyLoanComponent } from './features/apply-loan/apply-loan.component';
import { authguardGuard } from './core/guards/authguard.guard';
import { ApplicationsComponent } from './features/applications/applications.component';
import { noGuardGuard } from './core/guards/no-guard.guard';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
    },
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'register',
        component:AuthComponent,
        canActivate:[noGuardGuard]
    },
    {
        path:'apply-loan',
        component:ApplyLoanComponent,
        canActivate:[authguardGuard]
    },
    {
        path:'applications',
        component:ApplicationsComponent,
        canActivate:[authguardGuard]
    },
    {
        path:'**',
        redirectTo:'register'
    }
];
