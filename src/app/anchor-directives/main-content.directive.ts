import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appMainContent]'
})
export class MainContentDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
