import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getAllPosts();
  }

  allPosts: any = [];

  getAllPosts() {
    this.postService
      .getAllPosts()
      .subscribe((response) => (this.allPosts = response));
  }
}
