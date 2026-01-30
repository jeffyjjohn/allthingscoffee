/**
 * Interface for tracking consumption by a specific user in a household
 */
export interface IHouseholdUser {
  /**
   * Unique identifier for the user in the household
   */
  user_id: string;
  /**
   * Display name of the user
   */
  name: string;
  /**
   * Color identifier for UI representation
   */
  color?: string;
  /**
   * Timestamp when user joined the household
   */
  joined_date: number;
}

/**
 * Interface for household with multiple users sharing resources
 */
export interface IHousehold {
  /**
   * Unique identifier for the household
   */
  household_id: string;
  /**
   * Display name of the household
   */
  name: string;
  /**
   * UUID of the user who created the household
   */
  created_by: string;
  /**
   * Timestamp when household was created
   */
  created_date: number;
  /**
   * Array of users in this household (max 10)
   */
  users: Array<IHouseholdUser>;
  /**
   * Flag to indicate if household feature is enabled
   */
  is_enabled: boolean;
  /**
   * Invitation code for other users to join (alphanumeric, 6-8 chars)
   */
  invitation_code?: string;
}
