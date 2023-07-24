import { Component, Input } from '@angular/core';
import { Member } from 'src/app/shared/models/Member';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent {
  @Input() members: Member[];
}
