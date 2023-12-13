import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from 'src/components/administrator/administrator.component';
import { AdoptComponent } from 'src/components/adopt/adopt.component';
import { AdoptDetailComponent } from 'src/components/adoptDetail/adoptDetail.component';
import { ArticleDetailComponent } from 'src/components/articleDetail/articleDetail.component';
import { ArticlesComponent } from 'src/components/articles/articles.component';
import { ContactComponent } from 'src/components/contact/contact.component';
import { LoginComponent } from 'src/components/login/login.component';
import { ProfileComponent } from 'src/components/profile/profile.component';
import { AuthService } from 'src/services/Auth/auth.service';
import { AuthGuard } from './auth.guard';
import { FullComponent } from 'src/components/full/full.component';
import { AccesDeniedComponent } from 'src/components/accesDenied/accesDenied.component';

const routes: Routes = [
  {
    path: 'news',
    component: ArticlesComponent,
    data: {
      title: 'News',
      roles : ['User','Editor','Administrator']
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'all',
        component: ArticlesComponent,
        data: {
          title: 'All',
          roles : ['User','Editor','Administrator']
        },
      },
      {
        path: 'cute',
        component: ArticlesComponent,
        data: {
          title: 'Cute',
          roles : ['User','Editor','Administrator']
        },
      },
      {
        path: 'funny',
        component: ArticlesComponent,
        data: {
          title: 'Funny',
          roles : ['User','Editor','Administrator']
        },
      },
    ],
  },
  {
    path: 'news/:id',
    component: ArticleDetailComponent,
    canActivate: [AuthGuard],
    data : {roles : ['User','Editor','Administrator']}
  },
  { path: 'adopt', component: AdoptComponent, canActivate: [AuthGuard], data : {roles : ['User','Editor','Administrator']}},
  {
    path: 'adopt/:id',
    component: AdoptDetailComponent,
    canActivate: [AuthGuard],
    data : {roles : ['User','Editor','Administrator']}
  },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard], data : {roles : ['User','Editor','Administrator']}},
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data : {roles : ['User','Editor','Administrator']}
  },
  {
    path: 'administrator',
    component: AdministratorComponent,
    canActivate: [AuthGuard],
    data : {roles : ['Administrator']}
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  { path: 'acces-denied', component: AccesDeniedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
