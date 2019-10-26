import {Component, ElementRef, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {ChatService} from "../../services/chat.service";

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})

export class SidebarComponent {

  constructor(
    public authService: AuthService,
    public router: Router,
  ) {}

  onLogoutClick(): boolean {
    this.authService.logout();
    this.router.navigate(['/my/login']);
    return false;
  }
}
