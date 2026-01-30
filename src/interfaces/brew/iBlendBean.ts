/**
 * Interface for blend bean in a brew
 */
export interface IBlendBean {
  /**
   * UUID of the bean
   */
  bean_id: string;
  /**
   * Grams of this bean in the blend
   */
  grams: number;
  /**
   * Percentage of this bean in the blend (0-100)
   */
  percentage: number;
}
