import { Component, inject, Input } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RouterLinkActive, RouterLinkWithHref } from "@angular/router";
import { AuthService } from '../../../core/services/auth/auth.service';
import { IProfile } from '../../../core/interfaces/i-profile.interface';
// import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-navbar',
  imports: [RouterLinkActive, RouterLinkWithHref],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  ngOnInit(): void {
    initFlowbite();
    // this.spinner.show()
  }
  // private readonly spinner = inject(NgxSpinnerService)

  private readonly authService = inject(AuthService)
  signout(): void {
    this.authService.signout()
  }

  @Input() userData: IProfile | null = null

  

}
