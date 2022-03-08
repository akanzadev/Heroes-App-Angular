import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Observable } from 'rxjs';
import { Heroe } from '../../interfaces/heroe';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
    `
      .example-header-image {
        background-image: url('https://material.angular.io/assets/img/examples/shiba1.jpg');
        background-size: cover;
      }
    `,
  ],
})
export class ListComponent implements OnInit {
  heroes$!: Observable<Heroe[]>;
  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroes$ = this.heroesService.getAll();
  }
}
