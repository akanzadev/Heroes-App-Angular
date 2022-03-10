import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Heroe } from '../../interfaces/heroe';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, throwError } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [],
})
export class AddComponent implements OnInit {
  heroeForm!: FormGroup;
  heroe: Heroe = {
    id: '',
    superhero: '',
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: '',
  };
  publishers = [
    { id: 'DC Comics', desc: 'DC Comics' },
    { id: 'Marvel Comics', desc: 'Marvel Comics' },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          console.log(id);
          if (!id) return throwError(() => new Error('Not found'));
          return this.heroesService.getHeroe(id);
        })
      )
      .subscribe({
        next: (heroe) => {
          this.heroe = heroe;
          this.heroeForm.patchValue(heroe);
        },
      });
  }

  private buildForm() {
    this.heroeForm = this.formBuilder.group({
      superhero: ['', [Validators.required, Validators.minLength(3)]],
      alter_ego: ['', [Validators.required]],
      first_appearance: ['', [Validators.required]],
      characters: ['', [Validators.required]],
      publisher: ['', [Validators.required]],
      alt_img: ['', [Validators.pattern('^(http(s?):).*')]],
    });
  }
  onSubmit() {
    if (this.heroeForm.valid) {
      this.heroe.id ? this.updateHero() : this.createHero();
    } else {
      this.heroeForm.markAllAsTouched();
    }
  }

  createHero() {
    this.heroesService.create(this.heroeForm.value).subscribe({
      next: (heroe) => {
        this.router.navigate(['heroes/edit', heroe.id]);
      },
    });
  }

  updateHero() {
    this.heroesService
      .update({ ...this.heroeForm.value, id: this.heroe.id })
      .subscribe({
        next: (heroe) => {
          console.log(heroe);
        },
      });
  }

  validateRequired(name: string) {
    return (
      this.heroeForm.get(name)?.touched &&
      this.heroeForm.get(name)?.hasError('required')
    );
  }

  validateMinLength(name: string) {
    return (
      this.heroeForm.get(name)?.touched &&
      this.heroeForm.get(name)?.hasError('minlength')
    );
  }
}
