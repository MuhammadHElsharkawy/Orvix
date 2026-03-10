import { Component, ElementRef, EventEmitter, HostListener, inject, Input, Output, ViewChild } from '@angular/core';
import { IComment } from '../../core/interfaces/i-comment.interface';
import { DatePipe } from '@angular/common';
import { CommentsService } from '../../core/services/comments/comments.service';
import Swal from 'sweetalert2';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-single-comment',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './single-comment.component.html',
  styleUrl: './single-comment.component.css',
})
export class SingleCommentComponent {
  private readonly commentsService = inject(CommentsService)
  ngOnInit() {
    this.getMyId()
  }

  @Input() comment: IComment | null = null;
  @Output() refresh = new EventEmitter<void>();

  myId: string = '';
  getMyId(): void {
    this.myId = JSON.parse(localStorage.getItem('decodedToken')!).user;
  }



  isListOpen: boolean = false;
  toggleList(): void {
    this.isListOpen = !this.isListOpen;
  }
  @ViewChild('list') list!: ElementRef;
  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (this.list && !this.list.nativeElement.contains(event.target)) {
      this.isListOpen = false;
    }
  }

  @Input() postId!: string
  deleteComment(commentId: string) {
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
        this.commentsService.deleteComment(this.postId, commentId).subscribe({
          next: (res) => {
            console.log(res);
            this.commentsService.notifycommentDeleted();
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



  updateCommentControl: FormControl = new FormControl(this.comment?.content, [Validators.required])
  iseditCommentFormOpen: boolean = false;
  openEditCommentForm() {
    this.iseditCommentFormOpen = true;
    this.updateCommentControl.patchValue(this.comment?.content)
  }
  closeEditCommentForm() {
    this.iseditCommentFormOpen = false;
  }
  editCommentClick() {
    this.openEditCommentForm();
  }
  isLoading: boolean = false;
  saveCommentClick(commentId: any) {
    this.isLoading = true;
    const newComment: FormControl = this.updateCommentControl;
    if(newComment) {
      const form: FormData = new FormData()
      form.append('content', newComment.value)
      this.commentsService.updateComment(this.postId, commentId, form).subscribe({
        next: (res) => {
          this.commentsService.notifycommentUpdated();
          this.closeEditCommentForm();
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        }
      })
    }
    this.closeEditCommentForm();
  }
}
