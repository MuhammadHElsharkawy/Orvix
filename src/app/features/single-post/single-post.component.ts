import { Component, ElementRef, EventEmitter, HostListener, inject, Input, Output, ViewChild } from '@angular/core';
import { IPost } from '../../core/interfaces/i-post.interface';
import { DatePipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { CommentComponent } from "../comment/comment.component";
import { CommentsService } from '../../core/services/comments/comments.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostsService } from '../../core/services/posts/posts.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-single-post',
  imports: [DatePipe, RouterLink, CommentComponent, ReactiveFormsModule],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css',
})
export class SinglePostComponent {
  private readonly commentsService = inject(CommentsService) //
  private readonly postsService = inject(PostsService) //

  @Input() post: IPost | null = null

  commentText: FormControl = new FormControl(null, [Validators.required, Validators.pattern(/[\S]/)]) //
  commentPhoto: any; //
  getCommentPhoto(e: Event) {
    const input: HTMLInputElement = e.target as HTMLInputElement
    // console.log(input);
    if (input.files) {
      this.commentPhoto = input.files[0]
    }
  }
  isCommentValid: boolean = false;
  checkCommentValid(e: Event) {
    const x = e.target! as HTMLInputElement
    console.log(x.value);
    if (x.value) {
      this.isCommentValid = true
    } else {
      this.isCommentValid = false
    }
  }
  createComment(postId: any, e: SubmitEvent) {
    e.preventDefault()

    if (this.commentText) {
      // this.isCommentValid = true
      if (FormData) { }
      const form: FormData = new FormData()
      form.append('content', this.commentText.value)
      if (this.commentPhoto) {
        form.append('image', this.commentPhoto)
      }
      this.commentsService.createComment(postId, form).subscribe({
        next: (res) => {
          console.log(res);
          this.commentsService.notifycommentAdded();
          this.commentText.reset()
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }






  @ViewChild('DropDown') DropDown!: ElementRef
  isDropdownOpen: boolean = false;
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (this.DropDown && !this.DropDown.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }



  ngOnInit() {
    this.getMyId()
    
  }


  myId: string = '';
  getMyId(): void {
    this.myId = JSON.parse(localStorage.getItem('decodedToken')!).user;
  }
  

  deletePost(postId: string) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.postsService.deletePost(postId).subscribe({
          next: (res) => {
            console.log(res);
            this.postsService.notifyPostDeleted();
          },
          error: (err) => {
            console.log(err);
          }
        })

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }


  
}
