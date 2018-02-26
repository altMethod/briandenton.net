import { PostService } from './../services/post/post.service';
import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Post } from './../services/post/post';
import { OrderByDatePipe } from './../shared/order-by-date.pipe';
import { ReversePipe } from './../shared/reverse.pipe';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user = null;
  userName: any;
  posts: any;
  post: Post;
  isAdmin: boolean;
  uid: string;
  projects: any;

  constructor(private auth: AuthService, private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.posts = this.postService.posts;
    this.projects = this.postService.projects;

    this.auth.getAuthState().subscribe(
      (user) => {
        this.user = user;
        if (this.user) {
          this.userName = this.auth.getUserName();
        }
      }
    );
  }

  login(): void {
    this.auth.login();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/'], { queryParams: { 'refresh': 1 } });
  }

  delete(collection: string, post: Post): void {
    this.postService.delete(collection, post.id);
  }

  publishToggle(collection: string, post: Post): void {
    this.post = post;
    post.published ? this.post.published = false : this.post.published = true;
    this.postService.edit(collection, post.id, this.post);
  }

}
