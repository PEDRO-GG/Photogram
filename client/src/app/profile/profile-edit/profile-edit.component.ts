import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { ModalService } from 'src/app/_modal/modal.service';
import { AccountService } from 'src/app/_services/account.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit {
  username: string; // used to fetch user by username
  user: any; // current logged in user in its current state
  updatedUser: any; // model for ngForm

  constructor(
    private userService: UserService,
    private accountService: AccountService,
    private modalService: ModalService,
    private toastr: ToastrService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.username = user.username));
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.userService.getUser(this.username).subscribe((user) => {
      this.user = user;
      this.updatedUser = this.user; // some intial state is needed to show in the ngForm
    });
  }

  setMainPhoto(photo: any) {
    this.closeModal('custom-modal-1');
    this.userService.setMainPhoto(photo.id).subscribe(
      (response) => {
        this.user.profilePicture = photo;
        this.toastr.success('Changed profile picture');
      },
      (error) => {
        this.toastr.error('This is already your main photo');
      }
    );
  }

  updateUser() {
    this.userService.updateUser(this.updatedUser).subscribe(
      (response) => {
        this.user.introduction = this.updatedUser.introduction;
        this.toastr.success('Profile updated successfully');
      },
      (error) => {
        this.toastr.error('Something went wrong');
      }
    );
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
