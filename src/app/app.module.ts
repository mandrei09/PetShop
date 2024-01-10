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
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AdoptComponent } from 'src/components/adopt/adopt.component';
import { CatProfileComponent } from 'src/components/catProfile/catProfile.component';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ModifyUserModalComponent } from 'src/components/modifyUserModal/modifyUserModal.component';
import { RoleService } from 'src/services/RoleService/Role.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from 'src/services/Auth/auth.service';
import { LoginComponent } from 'src/components/login/login.component';
import { AccesDeniedComponent } from 'src/components/accesDenied/accesDenied.component';
import { PostsModalComponent } from 'src/components/postsModal/postsModal.component';
import { AddCatModalComponent } from 'src/components/addCatModal/addCatModal.component';
import { RegisterComponent } from 'src/components/register/register.component';
import { AddArticleModalComponent } from 'src/components/addArticleModal/addArticleModal.component';
import { TruncatePipe } from './pipes/Truncate/Truncate.pipe';
import { ReplyService } from 'src/services/ReplyService/Reply.service';
import { ProblemsComponent } from 'src/components/problems/problems.component';
import { UserModalComponent } from 'src/components/userModal/userModal.component';

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
    CatProfileComponent,
    ContactComponent,
    AdministratorComponent,
    TableComponent,
    FormSendModalComponent,
    ModifyUserModalComponent,
    LoginComponent,
    AccesDeniedComponent,
    PostsModalComponent,
    AddCatModalComponent,
    RegisterComponent,
    AddArticleModalComponent,
    TruncatePipe,
    ProblemsComponent,
    UserModalComponent
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
    ReactiveFormsModule,
  ],

  providers: [
    UserService,
    CatService,
    TableHeaderService,
    TableDataService,
    ArticleService,
    ProblemsService,
    RoleService,
    AuthGuard,
    AuthService,
    TruncatePipe,
    ReplyService
  ],

  bootstrap: [AppComponent],

})
export class AppModule { }
