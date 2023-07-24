import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MembersService } from 'src/app/services/members.service';
import { Member } from 'src/app/shared/models/Member';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit, OnDestroy {
  members: Member[] = [];
  private routeSubscription: Subscription;

  constructor(
    private membersService:MembersService, 
    private activatedRoute:ActivatedRoute, 
    private cdr:ChangeDetectorRef) {
  }
  
  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe((param) => {
      let memberObservable: Observable<Member[]>;

      if (param.lineup) {
        memberObservable = this.membersService.getAllMembersByLu(param.lineup.toLowerCase());
      } else {
        memberObservable = this.membersService.getAll();
      }

      memberObservable.subscribe((serverMember) => {
        this.members = serverMember;
        this.cdr.detectChanges(); // Move detectChanges here
      });
    });
  }

  ngOnDestroy(): void {
      this.routeSubscription.unsubscribe();
  }
}
