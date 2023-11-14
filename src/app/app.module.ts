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
import { SearchBarComponent } from 'src/components/searchBar/searchBar.component';
import { FormsModule } from '@angular/forms';
import { AdoptComponent } from 'src/components/adopt/adopt.component';
import { ShopComponent } from 'src/components/shop/shop.component';
import { AdoptDetailComponent } from 'src/components/adoptDetail/adoptDetail.component';
import { ContactComponent } from 'src/components/contact/contact.component';
import { AdministratorComponent } from 'src/components/administrator/administrator.component';
import { CatService } from 'src/services/CatService/Cat.service';
import { TableComponent } from 'src/components/table/table.component';
import { TableHeaderService } from 'src/services/TableHeaderService/TableHeader.service';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TableDataService } from 'src/services/TableDataService/TableData.service';
import { ArticleService } from 'src/services/ArticleService/Article.service';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ProblemsService } from 'src/services/ProblemsService/Problems.service';
import { MatDialogModule } from '@angular/material/dialog';
import { FormSendModalComponent } from 'src/components/formSendModal/formSendModal.component';
import { NotificationService } from 'src/services/NotificationService/Notification.service';
import { ToastrModule } from 'ngx-toastr';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ModifyUserModalComponent } from 'src/components/modifyUserModal/modifyUserModal.component';


@NgModule({
  declarations: [			
    AppComponent,
    FullComponent,
    ArticlesComponent,
    ArticleDetailComponent,
    ProfileComponent,
    ProfileModalComponent,
    SearchBarComponent,
    AdoptComponent,
    ShopComponent,
    AdoptDetailComponent,
    ContactComponent,
    AdministratorComponent,
    TableComponent,
    FormSendModalComponent,
    ModifyUserModalComponent
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
    MatMenuModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatCheckboxModule,
    ToastrModule.forRoot({tapToDismiss: true, closeButton: true, extendedTimeOut: 10000, progressBar: true, preventDuplicates: true, countDuplicates: true, positionClass: 'toast-bottom-right', newestOnTop: true}),
  ],
  providers: [
    UserService,
    CatService,
    TableHeaderService,
    TableDataService,
    ArticleService,
    ProblemsService,
    NotificationService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
