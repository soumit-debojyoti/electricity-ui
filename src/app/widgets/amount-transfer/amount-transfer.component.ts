import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../services/user.service/user.service';
import { LoadingScreenService } from '../../services/loading-screen/loading-screen.service';
import { User, TransferAmountModel } from '../../models/user.model';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { AlertService } from '../../services/common.service/alert.service';
import { MAT_MENU_DEFAULT_OPTIONS_FACTORY } from '@angular/material/menu/typings/menu-directive';
import { DataService } from 'src/app/services/data.service/data.service';

@Component({
  selector: 'app-amount-transfer',
  templateUrl: './amount-transfer.component.html',
  styleUrls: ['./amount-transfer.component.css']
})
export class AmountTransferComponent implements OnInit {
  public users: Array<User>;
  public filteredUsers: Array<User>;
  public userId: number;
  public senderUserId: number;
  constructor(private userService: UserService, private loadingScreenService: LoadingScreenService, private alertService: AlertService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, private data: DataService) { }

  ngOnInit() {
    this.userId = 0;
    this.senderUserId = 0;
    this.filteredUsers = [];
    this.getAllUsers();
  }

  private getAllUsers(): void {
    this.loadingScreenService.startLoading();
    this.userService.getAllUsers()
      .subscribe((response: Array<User>) => {
        this.loadingScreenService.stopLoading();
        this.userId = this.storage.get('user_id');
        this.users = [];
        response.forEach((item: User) => {
          const user: User = {
            email: item.email,
            user_id: item.user_id,
            user_name: item.user_name,
            role_name: item.role_name,
            security_stamp: item.security_stamp,
            first_name: item.first_name,
            last_name: item.last_name,
            middle_name: item.middle_name,
            father_name: item.father_name,
            dob: item.dob,
            mobile_number: item.mobile_number,
            pan_card: item.pan_card,
            aadhar_card: item.aadhar_card,
            address: item.address,
            post_office: item.post_office,
            police_station: item.police_station,
            district: item.district,
            city: item.city,
            state_name: item.state_name,
            sex: item.sex,
            pin: item.pin,
            photo: item.photo
          };
          user['role_id'] = item['role_id'];
          this.users.push(user);
        });
        const id = this.userId;
        this.users = response;
        this.filteredUsers = this.users.filter(function (value, index, arr) {
          return value.user_id !== id;
        });
      }, () => {
        this.loadingScreenService.stopLoading();
      }
      );
  }

  public changeUser($event, userId): void {
    this.senderUserId = +userId;
  }


  public submit(user: any, amount: any, comment: any) {
    if (user.value === '') {
      this.alertService.confirmationMessage('', 'User is mandatory.', 'warning', true, false);
      return false;
    } else if (amount.value === '') {
      this.alertService.confirmationMessage('', 'Amount is mandatory.', 'warning', true, false);
      return false;
    } else if (comment.value === '') {
      this.alertService.confirmationMessage('', 'Comment is mandatory.', 'warning', true, false);
      return false;
    } else if (user.value !== '' && amount.value !== '' && comment.value !== '') {
      if (this.validateUser(user)) {
        this.senderUserId = this.filteredUsers.find(c => c.user_name === user.value).user_id;
        this.userId = +this.storage.get('user_id');
        this.sendMoney(user, amount, comment);
      } else {
        this.alertService.confirmationMessage('', 'User is not valid.', 'warning', true, false);
        return false;
      }
    }
  }

  public clear(user: any, amount: any, comment: any) {
    user.value = '';
    amount.value = '';
    comment.value = '';
  }

  private sendMoney(user: any, amount: any, comment: any) {
    this.loadingScreenService.startLoading();
    this.userService.walletTransferRequest(this.userId, this.senderUserId, +amount.value, comment.value)
      .subscribe((response: TransferAmountModel) => {
        this.loadingScreenService.stopLoading();
        if (response.is_rejected) {
          this.alertService.confirmationMessage('', response.return_message, 'error', true, false);
        } else {
          this.alertService.confirmationMessage('', response.return_message, 'success', true, false);
        }
        user.value = '';
        amount.value = '';
        comment.value = '';
        this.data.changeMessage('token-generate');
      }, () => {
        this.loadingScreenService.stopLoading();
      });
    // Create an SP to validate the whether the sender has insuffcient balance?
    // Send update to the wallet balance for both the user.
    // Update the wallet transaction table for both the users.
  }

  private validateUser(user: any): boolean {
    return (this.filteredUsers.find(c => c.user_name === user.value)) ? true : false;
  }
}