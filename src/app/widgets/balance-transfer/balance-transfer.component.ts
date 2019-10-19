import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-balance-transfer',
  templateUrl: './balance-transfer.component.html',
  styleUrls: ['./balance-transfer.component.css']
})
export class BalanceTransferComponent implements OnInit {
  @Output() componentName = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  /** Emits the name of component clicked */
  exposeName(): void {
    this.componentName.emit('BALANCE-TRANSFER');
  }
}
