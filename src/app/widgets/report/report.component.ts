import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service/data.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  public isEmployee: boolean = false;
  constructor(private data: DataService) {
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => {
      if (message == 'employee') {
        this.isEmployee = true;
      }
      else {
        this.isEmployee = false;
      }
    });
  }


}
