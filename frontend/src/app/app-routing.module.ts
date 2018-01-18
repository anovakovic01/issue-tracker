import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { StarterPageComponent } from './starter-page/starter-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuardService } from './core/auth/auth-guard.service';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { CreateIssueComponent } from './issue/create-issue/create-issue.component';


const appRoutes: Routes = [
  { path: 'login', component: StarterPageComponent },
  { path: 'repositories/:repoId/issues/new', component: CreateIssueComponent, canActivate: [AuthGuardService] },
  { path: '', component: HomePageComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }