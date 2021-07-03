import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    public accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.checkIfLoggedIn();
  }

  isOpen: boolean = false;
  isLoggedIn: boolean = false;
  currentUser: any = null;

  changeOpenState() {
    this.isOpen = !this.isOpen;
  }

  checkIfLoggedIn() {
    this.accountService.currentUser$.subscribe((user) => {
      this.isLoggedIn = !!user;
      this.currentUser = user;
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
    this.toastr.success('Goodbye');
    this.router.navigateByUrl('/');
    this.changeOpenState();
  }
}
