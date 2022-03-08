import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroe';

@Pipe({
  name: 'restructureImage',
})
export class RestructureImagePipe implements PipeTransform {
  /*  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }  */
  transform(heroe: Heroe): string {
    // assets/heroes/{{ heroe.id }}.jpg
    return `assets/heroes/${heroe.id}.jpg`;
  }
}
