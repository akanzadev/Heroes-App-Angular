import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroe';

@Pipe({
  name: 'restructureImage',
  /* pure: false, */
})
export class RestructureImagePipe implements PipeTransform {
  /*  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }  */
  transform(heroe: Heroe): string {
    if (!heroe.id && !heroe.alt_img) {
      return 'assets/no-image.png';
    } else if (heroe.alt_img) {
      return heroe.alt_img;
    } else {
      return `assets/heroes/${heroe.id}.jpg`;
    }
  }
}
