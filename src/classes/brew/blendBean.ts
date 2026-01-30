import { IBlendBean } from '../../interfaces/brew/iBlendBean';

export class BlendBean implements IBlendBean {
  public bean_id: string;
  public grams: number;
  public percentage: number;

  constructor() {
    this.bean_id = '';
    this.grams = 0;
    this.percentage = 0;
  }

  public initializeByObject(blendBeanObj: IBlendBean): void {
    Object.assign(this, blendBeanObj);
  }
}
