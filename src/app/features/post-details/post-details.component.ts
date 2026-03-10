import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../core/services/posts/posts.service';
import { IPost } from '../../core/interfaces/i-post.interface';
import { Location } from '@angular/common';
import { SinglePostComponent } from "../single-post/single-post.component";

@Component({
  selector: 'app-post-details',
  imports: [ SinglePostComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly postsService = inject(PostsService)
  private readonly location = inject(Location)

  ngOnInit(): void {
    this.getPostId()
  }

  goBack() {
    this.location.back()
  }

  postId: any ;
  getPostId() {
    console.log('hello');
    this.activatedRoute.paramMap.subscribe((url) => {
      this.postId = url.get('id')
    })
    this.getPostDetails()
  }
  
  isLoading: boolean = false;
  postDetails!: IPost;
  getPostDetails() {
    this.isLoading = true;
    this.postsService.getPostDetails(this.postId).subscribe({
      next:(res) => {
        this.postDetails = res.data.post
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    })
  }
}
