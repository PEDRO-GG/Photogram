import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  user: any;

  loadUser() {
    this.userService
      .getUser(this.route.snapshot.paramMap.get('username'))
      .subscribe((user) => {
        this.user = user;
        console.log(this.user);
      });
  }
}
