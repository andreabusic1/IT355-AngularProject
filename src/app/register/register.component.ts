import { Component } from '@angular/core';
import { AuthService } from '../services/authService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const newUser = {
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      password: this.password,
      role: 'USER' 
    };

    this.authService.register(newUser).subscribe({
      next: (response) => {
        this.authService.handleAuthentication(response.jwt);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Registration failed', error);
      }
    });
  }
}
