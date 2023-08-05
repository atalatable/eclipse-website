import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-logout',
  templateUrl: './admin-logout.component.html',
  styleUrls: ['./admin-logout.component.scss']
})
export class AdminLogoutComponent {

  constructor (private adminService:AdminService) {}

  public logout() {
    this.adminService.logout();
  }
}
