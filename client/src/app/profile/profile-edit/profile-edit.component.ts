import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ModalService } from 'src/app/_modal/modal.service';
import { User } from 'src/app/_models/_user';
import { AccountService } from 'src/app/_services/account.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit {
  username: string;
  user: any;

  constructor(
    private userService: UserService,
    private accountService: AccountService,
    private modalService: ModalService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.username = user.username));
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.userService
      .getUser(this.username)
      .subscribe((user) => (this.user = user));
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
