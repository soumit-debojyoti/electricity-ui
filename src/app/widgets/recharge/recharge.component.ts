import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recharge-widget',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public gotorecharge() {
    this.router.navigate(['/recharge']);
  }

}
