import { Component } from '@angular/core';

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
}
