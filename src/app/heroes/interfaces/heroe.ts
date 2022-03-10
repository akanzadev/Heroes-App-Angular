export interface Heroe {
  alter_ego: string;
  characters: string;
  first_appearance: string;
  id: string;
  publisher?: Publisher;
  superhero: string;
  alt_img: string;
}

export enum Publisher {
  DCComics = 'DC Comics',
  MarvelComics = 'Marvel Comics',
}
export interface CreateHeroeDTO extends Omit<Heroe, 'id'> {}

export interface UpdateHeroeDTO extends Partial<CreateHeroeDTO> {
  id: string;
}
