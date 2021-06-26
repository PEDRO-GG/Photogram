import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {}

  user: any = {};
  userToPrint: any;
  login() {
    this.accountService.login(this.user).subscribe((response) => {
      this.accountService.currentUser$
        .pipe(take(1))
        .subscribe((user) => (this.userToPrint = user));
      console.log("Response from server: ", response);
      console.log('Current User: ', this.userToPrint);
      this.router.navigateByUrl("/")
    });
  }
}
