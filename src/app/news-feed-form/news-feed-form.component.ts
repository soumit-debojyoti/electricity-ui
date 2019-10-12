import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { LoadingScreenService } from '../services/loading-screen/loading-screen.service';
import { CommonService } from '../services/common.service/common.service';
import { NewsFeed } from '../models/common.model';
import { CustomValidator } from '../models/CustomValidator';
@Component({
  selector: 'app-news-feed-form',
  templateUrl: './news-feed-form.component.html',
  styleUrls: ['./news-feed-form.component.css']
})
export class NewsFeedFormComponent implements OnInit {
  public formSubmitted: boolean;
  public newsForm: FormGroup;
  public errorInSubmission: boolean;
  public viewMode: boolean;
  newsFeed: NewsFeed;
  newsFeeds: Array<NewsFeed>;
  public viewNewsForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService,
    private loadingScreenService: LoadingScreenService) { }

  ngOnInit() {
    this.formSubmitted = false;
    this.errorInSubmission = false;
    this.viewMode = false;
    this.newsFeeds = [];
    /**
     * Form control validation for post submission
     */
    this.newsForm = this.formBuilder.group(
      {
        feedTitle: ['', Validators.required],
        feedContent: ['', [Validators.required, Validators.maxLength(150)]],
        feedValidity: ['', [Validators.required, CustomValidator.numeric]]
      }
    );
    this.viewNewsForm = this.formBuilder.group({
      feedValidity: ['', [Validators.required, CustomValidator.numeric]]
    });
    this.fetchPost();
  }
  get formControl() {
    return this.newsForm.controls;
  }
  get viewFormControl() {
    return this.viewNewsForm.controls;
  }
  /**
   * Submits the post in the database
   */
  postMyNews(): void {
    this.newsFeed = new NewsFeed();
    this.newsFeed.content = this.formControl.feedContent.value;
    this.newsFeed.title = this.formControl.feedTitle.value;
    this.newsFeed.postValidity = this.formControl.feedValidity.value;
    this.newsFeed.postDate = new Date().toLocaleDateString();
    console.log(this.newsFeed);
    this.loadingScreenService.startLoading();
    this.commonService.postNews(this.newsFeed).subscribe(
      (response: boolean) => {
        this.formSubmitted = response;
        this.fetchPost();
        response ? this.errorInSubmission = !response : this.errorInSubmission = response;
        this.newsForm.reset();
        this.loadingScreenService.stopLoading();
      }, (err) => {
        console.log('error occured! news feed update', err);
        this.errorInSubmission = true;
        this.loadingScreenService.stopLoading();
      }
    );
  }
  /**
   * Changes the mode of view
   * @param mode | view mode
   */
  changeView(mode: string): void {
    if (mode === 'viewPost') {
      this.viewMode = true;
    } else {
      this.viewMode = false;
    }
  }
  /**
   * Fetches all post
   */
  public fetchPost(): void {
    this.loadingScreenService.startLoading();
    this.commonService.fetchNews().subscribe(
      (response: Array<NewsFeed>) => {
        this.newsFeeds = response;
        this.loadingScreenService.stopLoading();
        // this.setUpViewNewsFeedControls();
      }, (err) => {
        this.loadingScreenService.stopLoading();
      }
    );
  }

  updateNewsValidity(newsFeed: NewsFeed, controlValue: any, index: number): void {
    newsFeed.postValidity = controlValue;
    this.loadingScreenService.startLoading();
    this.commonService.updateNews(newsFeed).subscribe((response: boolean) => {
      if (response) {
        this.loadingScreenService.stopLoading();
        this.fetchPost();
      }
    }, (err) => {
      this.loadingScreenService.stopLoading();
      console.log('Error occured while updating news feed!', err);
    });
  }

  get formControlViewNews() {
    return this.viewNewsForm.controls;
  }

  checkValidNumber(newsFeed: NewsFeed): void {
    newsFeed.newsValid = this.viewNewsForm.valid;
  }

  // addFormGroup(): FormGroup  {
  //   return this.formBuilder.group(
  //     {
  //       feedValidity: ['', [Validators.required, CustomValidator.numeric]]
  //     }
  //   );
  // }

  // public setUpViewNewsFeedControls(): void {
  //   this.newsFeeds.forEach( (item: any) => {
  //     const control = <FormArray>this.viewNewsForm.get('feeds');
  //     control.push(this.addFormGroup());
  //   });
  // }


}
