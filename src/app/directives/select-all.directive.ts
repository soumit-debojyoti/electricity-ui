import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSelectAll]'

})
export class SelectAllDirective {

  constructor(private elRef: ElementRef) {
  }

  @HostListener('click') onClick() {
    this.elRef.nativeElement.select();
  }

}
