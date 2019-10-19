import { Component, OnInit, Output, EventEmitter, Input  } from '@angular/core';
@Component({
  selector: 'app-custom-date-picker',
  templateUrl: './custom-date-picker.component.html',
  styleUrls: ['./custom-date-picker.component.css']
})
export class CustomDatePickerComponent implements OnInit {
  date: Date;
  @Input('date')
  set allowDay(value: Date) {
      this.date = value;
  }
  public minDate = new Date(2019, 1, 1);
  public maxDate = new Date();
  // public date = new Date();
  @Output() selectedDate = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  dateChange(): void {
    this.emitSelectedDate();
  }

  emitSelectedDate(): void {
    this.selectedDate.emit(this.date);
  }
}
