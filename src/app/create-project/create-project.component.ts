import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post/post.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  exists: boolean;
  newProject: any;

  constructor(private postService: PostService, private router: Router) { }

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

  ngOnInit() {
  }

  create(post) {
    const slug = post.formTitle.replace(/\s+/g, '-').toLocaleLowerCase();

    this.postService.exists('projects', slug).then(res => {
      this.exists = res;

      if (this.exists) { return this.error('Project Exists'); }

      const date = new Date();
      const post_date = date.toISOString();

      this.newProject = {
        id: slug,
        title: post.formTitle,
        body: post.formBody,
        img: post.formImage,
        url: post.formUrl,
        published: post.formPublish,
        posted_date: post_date
      };

      this.postService.create('projects', this.newProject);
      this.router.navigate(['/']);
    });
  }

  error(error): void {
    console.log(error);
  }

}
