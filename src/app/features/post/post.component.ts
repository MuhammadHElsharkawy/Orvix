import { Component, ElementRef, HostListener, inject, Input, OnInit, ViewChild, viewChild } from '@angular/core';
import { PostsService } from '../../core/services/posts/posts.service';
import { IPost } from '../../core/interfaces/i-post.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentsService } from '../../core/services/comments/comments.service';
import { SinglePostComponent } from "../single-post/single-post.component";

@Component({
  selector: 'app-post',
  imports: [ReactiveFormsModule, SinglePostComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  private readonly postsService = inject(PostsService)
  private readonly commentsService = inject(CommentsService)

  ngOnInit(): void {
    if (this.isAll) {
      this.getAllPosts()
    }
    this.postsService.postAdded.subscribe(() => {
      this.getAllPosts()
    })
    this.postsService.postDeleted.subscribe(() => {
      this.getAllPosts()
    })
  }

  @Input() isAll: boolean = true;
  @Input() postList: IPost[] = []

  isLoading: boolean = false;
  getAllPosts() {
    this.isLoading = true
    this.postsService.getAllPosts().subscribe({
      next: (res) => {
        this.postList = res.data.posts
        this.isLoading = false
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false
      }
    })
  }

  

}
