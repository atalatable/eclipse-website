import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SocialsService } from 'src/app/services/socials.service';
import { Social } from 'src/app/shared/models/Social';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  socials:Social[] = [];

  constructor(private socialsService:SocialsService) {
    let socialsObservable:Observable<Social[]>;

    socialsObservable = socialsService.getAll();

    socialsObservable.subscribe((serverSocial) => {
      this.socials = serverSocial;
    })
  }
}
