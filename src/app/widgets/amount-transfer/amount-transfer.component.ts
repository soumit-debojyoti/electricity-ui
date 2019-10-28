import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../services/user.service/user.service';
import { LoadingScreenService } from '../../services/loading-screen/loading-screen.service';
import { User, TransferAmountModel, MobileValidationResponse, AccountValidationResponse } from '../../models/user.model';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { AlertService } from '../../services/common.service/alert.service';
import { DataService } from 'src/app/services/data.service/data.service';
import { FormControl } from '@angular/forms';
import { TalkBackService } from 'src/app/services/user.service/talk-back.service';

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
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, private data: DataService, private talkService: TalkBackService) { }

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


  public submit(user: any, mobile: any, amount: any, comment: any) {
    if (user.value === '' && mobile.value === '') {
      if (mobile.value === '') {
        this.alertService.confirmationMessage('', 'Mobile is mandatory.', 'warning', true, false);
        return false;
      } else if (user.value === '') {
        this.alertService.confirmationMessage('', 'User is mandatory.', 'warning', true, false);
      }
      return false;
    } else if (amount.value === '') {
      this.alertService.confirmationMessage('', 'Amount is mandatory.', 'warning', true, false);
      return false;
    } else if (comment.value === '') {
      this.alertService.confirmationMessage('', 'Comment is mandatory.', 'warning', true, false);
      return false;
    } else if ((user.value !== '' || mobile.value !== '') && amount.value !== '' && comment.value !== '') {
      if ((user.value !== '' || mobile.value !== '')) {
        if (user.value !== '') {
          if (this.validateUser(user)) {
            this.senderUserId = this.filteredUsers.find(c => c.user_name === user.value).user_id;
            this.userId = +this.storage.get('user_id');
            this.validateBankAccount(user, mobile, amount, comment);
          } else {
            this.alertService.confirmationMessage('', 'User is not valid.', 'warning', true, false);
            this.clear(user, amount, comment);
            return false;
          }
        } else if (mobile.value !== '') {
          this.validateMobile(mobile, user, amount, comment);
        }
      }
    }
  }

  public clear(user: any, amount: any, comment: any) {
    user.value = '';
    amount.value = '';
    comment.value = '';
  }

  private sendMoney(user: any, mobile: any, amount: any, comment: any) {
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
        mobile.value = '';
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

  private validateMobile(mobile: any, user: any, amount: any, comment: any): void {
    let isvalid = false;
    this.userService.validateMobile(mobile.value)
      .subscribe((response: MobileValidationResponse) => {
        if (!response.isValid) {
          this.alertService.confirmationMessage('', 'Mobile number not valid.', 'error', true, false);
          this.clear(user, amount, comment);
        } else {
          this.senderUserId = response.user_id;
          this.validateBankAccount(user, mobile, amount, comment);
        }
        isvalid = response.isValid;
      });
  }

  private validateBankAccount(user: any, mobile: any, amount: any, comment: any): void {
    this.userService.validateAccount(this.senderUserId)
      .subscribe((response: AccountValidationResponse) => {
        // if (!response.isValid) {
        //   this.alertService.confirmationMessage('',
        // response.message + 'So you can not send money to this account.', 'error', true, false);
        // } else {
        //   this.sendMoney(user, mobile, amount, comment);
        // }
        this.sendMoney(user, mobile, amount, comment);
        this.talkService.newTokenGenerated.next(true);
      });
  }
}
