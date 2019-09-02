import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service/common.service';
import { AlertService } from '../services/common.service/alert.service';
import { LoadingScreenService } from '../services/loading-screen/loading-screen.service';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {

  constructor(private common: CommonService, private alertService: AlertService,
    private loadingScreenService: LoadingScreenService) { }

  ngOnInit() {
  }

}
