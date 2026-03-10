import { Component, ComponentRef, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLinkActive } from '@angular/router';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent {
  private readonly router = inject(Router)

  // current(): string {
  //   return this.router.url.split('/')[1]
  //   // console.log(this.currentPath);
  // }
  // currentPath: string = ''
}
