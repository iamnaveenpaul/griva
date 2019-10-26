import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public flashMessagesService: FlashMessagesService,
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    this.checkLoggedIn();

    this.registerForm = this.formBuilder.group({
      //controlname: ['initial value', rules]
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(14),
        ],
      ],
      userEmailId: [
        '',
        [
          Validators.required
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(4)]],
      userPhone: ['', [Validators.required, Validators.minLength(10)]],
      confirmPass: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  checkLoggedIn(): void {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/my/dashboard']);
    }
  }

  onRegisterSubmit(): void {
    this.authService.registerUser(this.registerForm.value).subscribe(data => {
      if (data.success == true) {
        this.flashMessagesService.show(data.msg, {
          cssClass: 'alert-success',
          timeout: 3000,
        });
        this.router.navigate(['/my/login']);
      } else {
        this.flashMessagesService.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
      }
    });
  }
}
