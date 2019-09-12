import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-news-update',
  templateUrl: './news-update.component.html',
  styleUrls: ['./news-update.component.css']
})
export class NewsUpdateComponent implements OnInit {
  feedTitle: string;
  feedContent: string;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  gotoNewsUpdate(): void {
    console.log('News Update Called');
    this.router.navigate(['/news-update']);
  }
  postMyNews(): void {
    console.log('Title', this.feedTitle);
    console.log('Content', this.feedContent);
  }
}
