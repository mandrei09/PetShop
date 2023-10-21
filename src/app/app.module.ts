import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FullComponent } from 'src/components/full/full.component';
import { ArticlesComponent } from 'src/components/articles/articles.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ArticleDetailComponent } from 'src/components/articleDetail/articleDetail.component';
import { ProfileComponent } from 'src/components/profile/profile.component';
import { MatMenuModule } from '@angular/material/menu';
import { ProfileModalComponent } from 'src/components/profileModal/profileModal.component';
import { UserService } from 'src/services/UserService/User.service';


@NgModule({
  declarations: [			
    AppComponent,
      FullComponent,
      ArticlesComponent,
      ArticleDetailComponent,
      ProfileComponent,
      ProfileModalComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    RouterModule,
    MatMenuModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule { }
