import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  login() {
    const user = {
      strategy: 'local',
      email: this.email,
      password: this.password
    };
    this.authService.login(user).subscribe((res: any) => {

      this.email = '';
      this.password = '';

      localStorage.setItem('token', res.accessToken);
      localStorage.setItem('user', JSON.stringify(res.user));
      this.authService.setUser(res.user);

      this.snackBar.open('User logged in Successfully!', '', {
        duration: 3000
      });
      this.router.navigate(['home']);
    });
  }

}
