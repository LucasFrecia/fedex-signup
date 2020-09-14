import { Component, OnInit } from '@angular/core';
import { transitions } from '@core/animations/animations';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  animations: [transitions],

})
export class WelcomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
