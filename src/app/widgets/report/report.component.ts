import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service/data.service';
import { LoadingScreenService } from 'src/app/services/loading-screen/loading-screen.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  public isEmployee: boolean;
  constructor(private data: DataService,
    private loadingScreenService: LoadingScreenService, private router: Router) {
  }

  ngOnInit() {
    this.isEmployee = false;
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

  public gotoReport() {
    this.router.navigate(['/wallet', { type: 'report' }]);
  }


}
