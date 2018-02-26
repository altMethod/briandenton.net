import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post/post.service';
import { Post } from '../services/post/post';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  newPost: Post;
  exists: boolean;

  // Reactive forms
  postForm = new FormGroup({
    formTitle: new FormControl({
      validators: Validators.required,
      updateOn: 'submit'
    }),
    formBody: new FormControl({
      validators: Validators.required,
      updateOn: 'submit'
    }),
    formExcerpt: new FormControl({
      validators: Validators.required,
      updateOn: 'submit'
    }),
    formPublish: new FormControl({
      validators: Validators.required,
      updateOn: 'submit'
    })
  });

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
  }

  create(post) {
    const slug = post.formTitle.replace(/\s+/g, '-').toLocaleLowerCase();

    this.postService.exists('posts', slug).then(res => {
      this.exists = res;

      if (this.exists) { return this.error('Post Exists'); }

      const date = new Date();
      const post_date = date.toISOString();

      this.newPost = {
        id: slug,
        title: post.formTitle,
        body: post.formBody,
        excerpt: post.formExcerpt,
        published: post.formPublish,
        posted_date: post_date
      };

      this.postService.create('posts', this.newPost);
      this.router.navigate(['/']);
    });
  }

  error(error): void {
    console.log(error);
  }

}
