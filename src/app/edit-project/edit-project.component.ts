import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../services/post/post';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  project: Post;
  postId: string;

  // Reactive forms
  projectForm = new FormGroup({
    formTitle: new FormControl({
      validators: Validators.required,
      updateOn: 'submit'
    }),
    formBody: new FormControl({
      validators: Validators.required,
      updateOn: 'submit'
    }),
    formImage: new FormControl({
      validators: Validators.required,
      updateOn: 'submit'
    }),
    formUrl: new FormControl({
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

    this.postService.postById('projects', this.postId)
      .subscribe((post) => {
        this.project = post;
      });
  }

  edit(post) {
    const slug = post.formTitle.replace(/\s+/g, '-').toLocaleLowerCase();

    this.project = {
      id: slug,
      title: post.formTitle,
      body: post.formBody,
      img: post.formImage,
      url: post.formUrl,
      published: post.formPublish,
      posted_date: this.project.posted_date
    };

    if (this.postId !== this.project.id) {
      this.postService.create('projects', this.project);
      this.postService.delete('projects', this.postId);
    } else {
      this.postService.edit('projects', this.postId, this.project);
    }
    this.router.navigate(['/']);
  }

  error(error): void {
    console.log(error);
  }

}
