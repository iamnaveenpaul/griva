import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: Object;

  constructor(public authService: AuthService) {}

  saveProfile(): void {
    console.log(this.user);
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(
      data => {
        this.user = data.user;
      },
      err => {
        return false;
      }
    );
  }
}
