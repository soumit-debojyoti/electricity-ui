import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-api',
  templateUrl: './add-api.component.html',
  styleUrls: ['./add-api.component.css']
})
export class AddApiComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public gotoAddApi() {
    this.router.navigate(['/add-api']);
  }

}
