import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { ProfileService } from '../../services/profile/profile.service';
import { IProfile } from '../../interfaces/i-profile.interface';
import { NgxSpinnerService, NgxSpinnerComponent } from 'ngx-spinner';


@Component({
  selector: 'app-main-layout',
  imports: [NavbarComponent, RouterOutlet, NgxSpinnerComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  private readonly profileService = inject(ProfileService)
  private readonly spinner = inject(NgxSpinnerService)

  ngOnInit() {
    this.getUserProfile()
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
