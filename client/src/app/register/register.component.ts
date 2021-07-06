import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  newUser: any = {};
  register() {
    this.accountService.register(this.newUser).subscribe(
      (response) => {
        this.router.navigateByUrl('/');
        this.toastr.success(`Welcome ${this.newUser.username}`);
      },
      (error) => {
        if (typeof error.error === 'string') {
          this.toastr.error(error.error);
        } else if (Object.keys(error.error.errors).length > 1) {
          for (const key in error.error.errors) {
            if (error.error.errors[key]) {
              this.toastr.error(error.error.errors[key]);
            }
          }
        } else {
          this.toastr.error(String(Object.values(error.error.errors)[0]));
        }
      }
    );
  }
}
