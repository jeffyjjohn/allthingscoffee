/**
 * Interface for tracking consumption of a bean by a specific user
 */
export interface IBeanConsumption {
  /**
   * UUID of the user in the household
   */
  user_id: string;
  /**
   * Grams consumed by this user
   */
  grams_consumed: number;
}
