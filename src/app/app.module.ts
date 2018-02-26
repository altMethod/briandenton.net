import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClarityModule } from 'clarity-angular';
import { environment } from '../environments/environment.prod';
import { ReactiveFormsModule } from '@angular/forms';
import { TinymceModule } from 'angular2-tinymce';
import { tinymceConfig } from './shared/tinymce-config';

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { ProjectsComponent } from './projects/projects.component';
import { ResumeComponent } from './resume/resume.component';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { EditComponent } from './edit/edit.component';
import { BlogComponent } from './blog/blog.component';
import { CreateComponent } from './create/create.component';
import { OrderByDatePipe } from './shared/order-by-date.pipe';
import { ReversePipe } from './shared/reverse.pipe';
import { PostService } from './services/post/post.service';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { CreateProjectComponent } from './create-project/create-project.component';

const routes: Routes = [
  { path: '', component: BlogComponent, pathMatch: 'full' },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'create/post', component: CreateComponent, canActivate: [AuthGuard] },
  { path: 'create/project', component: CreateProjectComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'edit', component: EditComponent, canActivate: [AuthGuard] },
  { path: 'edit/post/:path', component: EditComponent, canActivate: [AuthGuard] },
  { path: 'edit/project/:path', component: EditProjectComponent, canActivate: [AuthGuard] },
  { path: 'post', component: PostComponent },
  { path: 'post/:path', component: PostComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: BlogComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    ProjectsComponent,
    ResumeComponent,
    ContactComponent,
    AdminComponent,
    EditComponent,
    BlogComponent,
    CreateComponent,
    OrderByDatePipe,
    ReversePipe,
    LoginComponent,
    EditProjectComponent,
    CreateProjectComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase, 'briandentonnet'),
    BrowserModule,
    ReactiveFormsModule,
    TinymceModule.withConfig(tinymceConfig.options),
    ClarityModule.forRoot(),
    RouterModule.forRoot(routes),
    AngularFirestoreModule.enablePersistence()
  ],
  providers: [AuthService, PostService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
