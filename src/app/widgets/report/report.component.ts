import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service/data.service';
import { LoadingScreenService } from 'src/app/services/loading-screen/loading-screen.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  public isEmployee: boolean = false;
  constructor(private data: DataService,
    private loadingScreenService: LoadingScreenService) {
  }

  ngOnInit() {
    this.loadingScreenService.startLoading();
    this.data.currentMessage.subscribe(message => {
      this.loadingScreenService.stopLoading();
      if (message === 'employee') {
        this.isEmployee = true;
      } else {
        this.isEmployee = false;
      }
    }, () => {
      this.loadingScreenService.stopLoading();
    });
  }


}
