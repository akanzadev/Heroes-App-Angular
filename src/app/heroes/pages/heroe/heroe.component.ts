import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroe';
import { HeroesService } from '../../services/heroes.service';
import { switchMap, throwError } from 'rxjs';
@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [],
})
export class HeroeComponent implements OnInit {
  heroe!: Heroe;
  constructor(
    private readonly activedRoute: ActivatedRoute,
    private heroeService: HeroesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activedRoute.paramMap
      .pipe(
        switchMap((params) => {
          let id = params.get('id');
          if (!id) return throwError(() => new Error('Not found id'));
          return this.heroeService.getHeroe(id);
        })
      )
      .subscribe({
        next: (heroe) => {
          console.log(heroe);
          this.heroe = heroe;
        },
        error: (err) => {
          console.error(err.message);
          alert(err.message);
          this.router.navigate(['/heroes']);
        },
      });
  }

  backToList() {
    this.router.navigate(['/heroes']);
  }
}
