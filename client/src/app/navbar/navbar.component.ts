import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, public accountService: AccountService) {}

  ngOnInit(): void {
    this.checkIfLoggedIn();
  }

  isOpen: boolean = false;
  isLoggedIn: boolean = false;

  changeOpenState() {
    this.isOpen = !this.isOpen;
  }

  checkIfLoggedIn() {
    this.accountService.currentUser$.subscribe((user) => {
      console.log(user);
      this.isLoggedIn = !!user;
      console.log(this.isLoggedIn);
    });
  }

  register() {
    this.router.navigateByUrl('/register');
    this.changeOpenState();
  }

  login() {
    this.router.navigateByUrl('/login');
    this.changeOpenState();
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
    this.changeOpenState();
  }
}
