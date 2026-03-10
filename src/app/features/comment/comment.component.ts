import { Component, ElementRef, HostListener, inject, Input, OnInit, ViewChild } from '@angular/core';
import { CommentsService } from '../../core/services/comments/comments.service';
import { IComment } from '../../core/interfaces/i-comment.interface';
import { SingleCommentComponent } from "../single-comment/single-comment.component";

@Component({
  selector: 'app-comment',
  imports: [SingleCommentComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent implements OnInit {
  private readonly commentsService = inject(CommentsService)

  ngOnInit(): void {
    this.getPostComments()
  }
  commentsList:IComment[] = []
  
  isLoading: boolean = false;
  @Input() postId!:string
  getPostComments() {
    this.isLoading = true
    this.commentsService.getPostComments(this.postId).subscribe({
      next:(res) => {
        // console.log(res.data.comments);
        this.commentsList = res.data.comments        
        this.isLoading = false
        this.commentsService.commentAdded.subscribe(() => {
          this.getPostComments();
        })
        this.commentsService.commentDeleted.subscribe(() => {
          this.getPostComments();
        })
        this.commentsService.commentUpdated.subscribe(() => {
          this.getPostComments();
        })
      },
      error:(err) => {
        console.log(err);
        this.isLoading = false
      }
    })
  }





  
}
