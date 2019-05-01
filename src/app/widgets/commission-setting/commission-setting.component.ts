import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commission-setting',
  templateUrl: './commission-setting.component.html',
  styleUrls: ['./commission-setting.component.css']
})
export class CommissionSettingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public gotoConfiguration() {
    this.router.navigate(['/configuration']);
  }

}
