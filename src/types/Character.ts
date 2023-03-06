import type { Episode } from './Episode';
import type { OriginLocation } from './OriginLocation';

export interface Character {
  id: string;
  name: string;
  image: string;
  gender: string;
  species: string;
  status: string;
  type: string;
  origin: OriginLocation;
  location: OriginLocation;
  episode: Array<Episode>;
}
