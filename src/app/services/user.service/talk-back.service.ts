import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class TalkBackService {
    public newTokenGenerated = new Subject<boolean>();
  }