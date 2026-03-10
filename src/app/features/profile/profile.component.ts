import { Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../../core/services/profile/profile.service';
import { IProfile } from '../../core/interfaces/i-profile.interface';
import { IPost } from '../../core/interfaces/i-post.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { PostComponent } from "../post/post.component";
import { PostsService } from '../../core/services/posts/posts.service';

@Component({
  selector: 'app-profile',
  imports: [PostComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private readonly profileService = inject(ProfileService)
  private readonly postsService = inject(PostsService)
  private readonly activatedRoute = inject(ActivatedRoute)

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = params.get('id');
      if (this.userId) {
        this.isMyProfile = false;
        this.getUserProfile()
        this.getUserPosts()
      }
      else {
        this.getMyProfile()
      }
    })
  }

  isMyProfile: boolean = true;
  activeTap: string = 'posts';

  changeTap(tap: string): void {
    this.activeTap = tap;
  }

  isLoading: boolean = true;
  profile: IProfile | null = null
  userPosts: IPost[] = [];
  getMyProfile() {
    this.isLoading = true;
    this.profileService.getMyProfile().subscribe({
      next: (res) => {
        // console.log(res);
        this.profile = res.user
        this.userPosts = res.posts
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    })
  }


  userId: string | null = null
  getUserProfile() {
    if (this.userId) {
      this.isLoading = true;
      this.profileService.getUserProfile(this.userId).subscribe({
        next: (res) => {
          // console.log(res);
          this.profile = res.data.user
          console.log(this.profile);
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        }
      })
    }
  }
  getUserPosts() {
    if (this.userId) {
      this.isLoading = true;
      this.profileService.getUserPosts(this.userId).subscribe({
        next: (res) => {
          // console.log(res);
          this.userPosts = res.data.posts
          console.log(this.userPosts);
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        }
      })
    }
  }

}
