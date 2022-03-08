import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroe';

@Component({
  selector: 'app-heroe-card',
  templateUrl: './heroe-card.component.html',
  styles: [],
})
export class HeroeCardComponent {
  @Input() heroe!: Heroe;
  constructor() {}
}
