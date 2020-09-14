import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import { transitions } from '@core/animations/animations';
import { CoreComponent } from '@core/core.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [transitions],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent extends CoreComponent {

  constructor() {
    super();
  }
}
