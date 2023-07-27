import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showNavOnMobile:boolean = false;

  burgerClicked():void {
    this.showNavOnMobile = !this.showNavOnMobile;
  }

  linkClicked():void {
    this.showNavOnMobile = false;
  }

  @HostListener('document:touchstart', ['$event'])
  swipeout(event) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      this.showNavOnMobile == true ? this.showNavOnMobile = false : null;
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      this.showNavOnMobile == true ? this.showNavOnMobile = false : null;
    }
  }

  constructor(private eRef:ElementRef ) {}
}
