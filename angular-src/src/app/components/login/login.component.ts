import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public flashMessagesService: FlashMessagesService,
    public chatService: ChatService
  ) {}

  ngOnInit() {
    this.checkLoggedIn();

    this.loginForm = this.formBuilder.group({
      //controlname: ['initial value', rules]
      userEmailId: ['',[Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  checkLoggedIn(): void {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/my/dashboard']);
    }
  }

  onLoginSubmit(): void {
    this.authService.authenticateUser(this.loginForm.value).subscribe(data => {
      if (data.success == true) {
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['/my/dashboard']);
      } else {
        this.flashMessagesService.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
      }
    });
  }
}
