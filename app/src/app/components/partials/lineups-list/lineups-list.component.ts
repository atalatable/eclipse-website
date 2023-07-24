import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-lineups-list',
  templateUrl: './lineups-list.component.html',
  styleUrls: ['./lineups-list.component.scss']
})
export class LineupsListComponent {
  lus: string[];

  constructor(membersService:MembersService, private router:Router) {
    let luObservable:Observable<string[]>;

    luObservable = membersService.getAllLu();

    luObservable.subscribe(serverLu => {
      this.lus = serverLu;
    });
  }

  navigateToMember(lu: string): void {
    this.router.navigate(["/members", lu.toLowerCase()]);
  }
}
