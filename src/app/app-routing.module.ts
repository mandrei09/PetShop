import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from 'src/components/administrator/administrator.component';
import { AdoptComponent } from 'src/components/adopt/adopt.component';
import { AdoptDetailComponent } from 'src/components/adoptDetail/adoptDetail.component';
import { ArticleDetailComponent } from 'src/components/articleDetail/articleDetail.component';
import { ArticlesComponent } from 'src/components/articles/articles.component';
import { ContactComponent } from 'src/components/contact/contact.component';
import { ProfileComponent } from 'src/components/profile/profile.component';
import { ShopComponent } from 'src/components/shop/shop.component';

const routes: Routes = [
  { 
    path: 'news', 
    component : ArticlesComponent,
    data: {
      title: 'News',
    },
    children: 
    [
      {
        path: 'all',
        component: ArticlesComponent,
        data: {
          title: 'All'
        }
      },
      {
        path: 'cute',
        component: ArticlesComponent,
        data: {
          title: 'Cute'
        }
      },
      {
        path: 'funny',
        component: ArticlesComponent,
        data: {
          title: 'Funny'
        }
      }
    ]
  },
  { path: 'news/:id', component: ArticleDetailComponent},
  { path: 'adopt', component: AdoptComponent},
  { path: 'adopt/:id', component: AdoptDetailComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'shop', component: ShopComponent},
  { path: 'profile/:id', component: ProfileComponent},
  { path: 'administrator', component: AdministratorComponent},
  { path: '', redirectTo: '/news', pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
