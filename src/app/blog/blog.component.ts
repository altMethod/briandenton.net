import { PostService } from './../services/post/post.service';
import { Component, OnInit } from '@angular/core';
import { OrderByDatePipe } from '../shared/order-by-date.pipe';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  posts: any;

  constructor(public postService: PostService) { }

  ngOnInit() {
    this.posts = this.postService.posts;
  }

}
