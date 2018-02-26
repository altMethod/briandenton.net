import { PostService } from '../services/post/post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../services/post/post';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post;
  postId: string;

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postId = params['path'];
    });

    this.postService.postById('posts', this.postId)
      .subscribe((post) => {
        this.post = post;
      });
  }

}
