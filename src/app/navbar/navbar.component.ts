// NavbarComponent

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authService/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // Provera da li je korisnik prijavljen kada se komponenta inicijalizuje
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logout(): void {
    // Metoda za odjavu korisnika
    this.authService.logout();
    // Ažuriranje statusa prijave nakon odjave
    this.isLoggedIn = false;
  }
}
