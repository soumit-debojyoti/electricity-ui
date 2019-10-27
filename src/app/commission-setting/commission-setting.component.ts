import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-commission-setting',
  templateUrl: './commission-setting.component.html',
  styleUrls: ['./commission-setting.component.css']
})
export class CommissionSettingComponent implements OnInit {
  dynamicForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      numberOfTickets: ['', Validators.required],
  });
  }

}
