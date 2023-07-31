import { Component, ElementRef, HostListener } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Admin } from 'src/app/shared/models/Admin';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showNavOnMobile:boolean = false;
  admin:Admin;

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

  constructor(private eRef:ElementRef, private adminService:AdminService) {
    this.adminService.adminObservable.subscribe(newAdmin => {
      this.admin = newAdmin;
    })
  }
}
