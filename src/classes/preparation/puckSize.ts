import { IPuckSize } from '../../interfaces/preparation/iPuckSize';

export class PuckSize implements IPuckSize {
  public name: string;
  public grams: number;
  public description?: string;

  constructor(name: string = '', grams: number = 0, description: string = '') {
    this.name = name;
    this.grams = grams;
    this.description = description;
  }

  public initializeByObject(puckSizeObj: IPuckSize): void {
    Object.assign(this, puckSizeObj);
  }
}
