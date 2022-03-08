import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [],
})
export class HeroeComponent implements OnInit {
  constructor(private readonly activedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((params) => {
      console.log(params.get('id'));
    });
  }
}
