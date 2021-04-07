import { Property } from 'nest-api-generator';

export class CreateShortenURLAJAXRequest {
  @Property('url', String)
  url: string;
}

export interface ShortenURL {
  url: string;
  expireAt: Date;
}
