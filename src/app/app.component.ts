import { PostService } from './services/post/post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAdmin: boolean;
  email: string;
  loaded = false;

  constructor(private auth: AuthService, private postService: PostService, private route: ActivatedRoute, private location: Location) {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.email = user.providerData[0].email;
        this.postService.exists('users', this.email).then(res => {
          this.isAdmin = res;
        }).catch(error => {
          this.isAdmin = false;
        });
      }
      this.loaded = true;
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(val => this.checkParams(val));
  }

  checkParams(val) {
    if (val.refresh) {
      this.location.replaceState('/');
      window.location.reload();
    }
  }
}
