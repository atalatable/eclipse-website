import { Component, Input } from '@angular/core';
import { Member } from 'src/app/shared/models/Member';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent {
  @Input() member: Member;

  state: "" | "flipped" = "";

  cardClicked(): void {
    console.log("Card clicked")
    this.state === "" ?
      this.state = "flipped" : this.state = "";
  }
}
