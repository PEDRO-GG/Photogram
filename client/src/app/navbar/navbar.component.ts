import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isOpen: boolean = false;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {}

  changeOpenState() {
    this.isOpen = !this.isOpen;
  }

  register() {
    this.router.navigateByUrl("/register")
    this.changeOpenState()
  }
  login(){
    this.router.navigateByUrl("/login")
    this.changeOpenState()
  }
}
