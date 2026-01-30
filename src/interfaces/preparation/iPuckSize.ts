/**
 * Interface for puck sizes used in espresso preparation
 */
export interface IPuckSize {
  /**
   * Name of the puck size (e.g., "Single Shot", "Double Shot")
   */
  name: string;
  /**
   * Default grams for this puck size
   */
  grams: number;
  /**
   * Optional description
   */
  description?: string;
}
