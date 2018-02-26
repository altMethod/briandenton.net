import { Component, OnInit } from '@angular/core';
import { Post } from '../services/post/post';
import { PostService } from '../services/post/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  post: Post;
  postId: string;

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

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postId = params['path'];
    });

    this.postService.postById('posts', this.postId)
      .subscribe((post) => {
        this.post = post;
      });
  }

  edit(post) {
    const slug = post.formTitle.replace(/\s+/g, '-').toLocaleLowerCase();

    this.post = {
      id: slug,
      title: post.formTitle,
      body: post.formBody,
      excerpt: post.formExcerpt,
      published: post.formPublish,
      posted_date: this.post.posted_date
    };

    if (this.postId !== this.post.id) {
      this.postService.create('posts', this.post);
      this.postService.delete('posts', this.postId);
    } else {
      this.postService.edit('posts', this.postId, this.post);
    }
    this.router.navigate(['/']);
  }

  error(error): void {
    console.log(error);
  }

}
