import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/_user';
import { AccountService } from 'src/app/_services/account.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  user: User;

  constructor(
    private userService: UserService,
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {}

  file: File;

  caption: any = null;

  onSelect(event) {
    console.log(event);
    this.file = event.addedFiles[0];
  }

  onRemove(event) {
    console.log(event);
    this.file = null;
  }

  submitPost() {
    this.userService
      .createPost(this.caption, this.file)
      .subscribe((response) => {
        this.toastr.success('Picture uploaded successfully');
        this.router.navigateByUrl(`/profile/${this.user.username}`);
        console.log(response);
      });
  }
}
