import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  register() {
    const user = {
      email: this.email,
      password: this.password
    };
    this.authService.register(user).subscribe(res => {

      this.email = '';
      this.password = '';

      this.snackBar.open('User registered Successfully!', '', {
        duration: 3000
      });
      this.router.navigate(['login']);
    });
  }

}
