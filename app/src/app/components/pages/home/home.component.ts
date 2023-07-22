import { Component, isDevMode } from '@angular/core';
import { MEMBERS_URL } from 'src/app/shared/constants/url';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  mode = isDevMode();
  url_members:string = MEMBERS_URL;
}
