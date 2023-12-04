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

const routes: Routes = [
  {
    path: 'news',
    component: ArticlesComponent,
    data: {
      title: 'News',
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'all',
        component: ArticlesComponent,
        data: {
          title: 'All',
        },
      },
      {
        path: 'cute',
        component: ArticlesComponent,
        data: {
          title: 'Cute',
        },
      },
      {
        path: 'funny',
        component: ArticlesComponent,
        data: {
          title: 'Funny',
        },
      },
    ],
  },
  {
    path: 'news/:id',
    component: ArticleDetailComponent,
    canActivate: [AuthGuard],
  },
  { path: 'adopt', component: AdoptComponent, canActivate: [AuthGuard] },
  {
    path: 'adopt/:id',
    component: AdoptDetailComponent,
    canActivate: [AuthGuard],
  },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'administrator',
    component: AdministratorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
