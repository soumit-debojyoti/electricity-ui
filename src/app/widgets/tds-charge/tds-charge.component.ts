import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tds-charge',
  templateUrl: './tds-charge.component.html',
  styleUrls: ['./tds-charge.component.css']
})
export class TdsChargeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goToCommissionSetting(): void {
    console.log('I am clicked');
    this.router.navigate(['/commission-setting']);
  }
}
