import { PostService } from './../services/post/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: any;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.projects = this.postService.projects;
  }

}
