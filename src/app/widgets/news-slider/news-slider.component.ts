import { Component, OnInit } from '@angular/core';
import { NewsFeed } from 'src/app/models/common.model';
import { CommonService } from '../../services/common.service/common.service';
import { LoadingScreenService } from '../../services/loading-screen/loading-screen.service';
@Component({
  selector: 'app-news-slider',
  templateUrl: './news-slider.component.html',
  styleUrls: ['./news-slider.component.css']
})
export class NewsSliderComponent implements OnInit {
  public feeds: Array<NewsFeed>;
  public finalfeeds: string;
  constructor(private commonService: CommonService, private loadingScreenService: LoadingScreenService) { }

  ngOnInit() {
    this.feeds = [];
    this.finalfeeds = '';
    this.fetchAllNews();
  }

  fetchAllNews(): void {
    this.loadingScreenService.startLoading();
    this.commonService.fetchNews().subscribe(
      (response) => {
        this.feeds = response;
        this.feeds.forEach((item: NewsFeed) => {
          this.finalfeeds = this.finalfeeds + item.content + '  ';
        });
        this.loadingScreenService.stopLoading();
      }, (err) => {
        console.log('Error occured in news slider', err);
        this.loadingScreenService.stopLoading();
      }
    );
  }
}
