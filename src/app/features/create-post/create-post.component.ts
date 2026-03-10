import { Component, ElementRef, EventEmitter, HostListener, inject, Output, ViewChild } from '@angular/core';
import { PostsService } from '../../core/services/posts/posts.service';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProfile } from '../../core/interfaces/i-profile.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProfileService } from '../../core/services/profile/profile.service';

@Component({
  selector: 'app-create-post',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  private readonly postsService = inject(PostsService)
  private readonly profileService = inject(ProfileService)
  private readonly spinner = inject(NgxSpinnerService)

  @Output() refresh = new EventEmitter<void>();

  ngOnInit() {
    this.getUserProfile()
  }

  postText: FormControl = new FormControl(null, [Validators.required, Validators.pattern(/[\S]/)])
  postImg: any;
  imagePreview: any;

  getPostImg(e: Event) {
    const input = e.target as HTMLInputElement

    if (input.files && input.files.length > 0) {
      this.postImg = input.files[0]
      const reader = new FileReader()
      reader.onload = () => {
        this.imagePreview = reader.result
      }
      reader.readAsDataURL(this.postImg)
    }
  }

  @ViewChild('Model') Model!: ElementRef
  isModelOpen: boolean = false;
  toggleDropdown(): void {
    this.isModelOpen = !this.isModelOpen;
  }
  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (this.Model && !this.Model.nativeElement.contains(event.target)) {
      this.isModelOpen = false;
      this.clearInputs()
    }
  }

  createPost(e: SubmitEvent) {
    e.preventDefault()

    if (this.postText.valid) {
      const formdata: FormData = new FormData()
      formdata.append('body', this.postText.value)
      if (this.postImg) {
        formdata.append('image', this.postImg)
      }
      
      this.isModelOpen = false
      this.postsService.createPost(formdata).subscribe({
        next: (res) => {
          console.log(res)
          this.clearInputs()
          this.postsService.notifyPostAdded();
        },
        error: (err) => {
          console.log(err)
          this.clearInputs()
        }
      })
    }
  }
  clearInputs(): void {
    this.postText.reset();
    this.postImg = null;
    this.imagePreview = null;
  }


  
  profile: IProfile | null = null
  getUserProfile() {
    this.spinner.show()
    this.profileService.getMyProfile().subscribe({
      next: (res) => {
        this.profile = res.user
        this.spinner.hide()
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide()
      }
    })
  }
}
