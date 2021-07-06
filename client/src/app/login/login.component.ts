import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  user: any = {};
  login() {
    this.accountService.login(this.user).subscribe(
      (response) => {
        this.toastr.success(`Welcome back ${this.user.username}`);
        this.router.navigateByUrl('/');
      },
      (error) => {
        this.toastr.error('Invalid credentials');
      }
    );
  }

  forgotPassword() {
    this.toastr.show('Feature coming soon');
  }
}
