import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroe';
import { map, Observable, startWith, switchMap, tap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
    `
      .example-form {
        min-width: 150px;
        width: 100%;
      }

      .example-full-width {
        width: 100%;
      }

      .example-option-img {
        vertical-align: middle;
        margin-right: 8px;
      }

      [dir='rtl'] .example-option-img {
        margin-right: 0;
        margin-left: 8px;
      }
    `,
  ],
})
export class SearchComponent implements OnInit {
  stateCtrl = new FormControl();
  filteredStates!: Observable<Heroe[]>;
  heroes: Heroe[] = [];
  heroeSelected!: Heroe | undefined;
  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroesService.getAll().subscribe((heroes) => {
      this.heroes = heroes;
      /*  this.filteredStates = this.stateCtrl.valueChanges.pipe(
        startWith(''),
        map((state) =>
          state ? this._filterHeroes(state) : this.heroes.slice()
        )
      ); */
      this.filteredStates = this.stateCtrl.valueChanges.pipe(
        startWith(''),
        map((state) => this._filterHeroes(state))
      );
    });
  }

  private _filterHeroes(value: string): Heroe[] {
    const filterValue = value.toLowerCase();
    /* return this.heroes.filter(
      (heroe) => heroe.superhero.toLowerCase().indexOf(filterValue) === 0
    ); */
    return this.heroes.filter((heroe) => {
      return heroe.superhero.toLowerCase().includes(filterValue);
    });
  }

  onSelect(heroe: Heroe | undefined): void {
    this.heroeSelected = heroe;
    /* this.heroesService.getHeroe(heroe.id).subscribe((heroe) => {
      this.heroeSelected = heroe;
    }); */
  }
}
