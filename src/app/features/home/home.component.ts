import { Component, inject, OnInit } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { PostsService } from '../../core/services/posts/posts.service';
import { CreatePostComponent } from "../create-post/create-post.component";
import { PostComponent } from "../post/post.component";
import { IPost } from '../../core/interfaces/i-post.interface';

@Component({
  selector: 'app-home',
  imports: [CreatePostComponent, PostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private readonly postsService = inject(PostsService)

  ngOnInit(): void {
    this.getToken()
  }

  getToken(): void {
    const token: string | null = localStorage.getItem('token')
    const decoded = jwtDecode(token!);
    // console.log(decoded);
  }

  
}
