import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-side-menu',
  templateUrl: './admin-side-menu.component.html',
  styleUrls: ['./admin-side-menu.component.scss']
})
export class AdminSideMenuComponent {
  public choice:string = 'socials';

  public onClick(str:string) {
    this.choice = str;
  }
}
