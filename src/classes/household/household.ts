import { IHousehold, IHouseholdUser } from '../../interfaces/household/iHousehold';

export class HouseholdUser implements IHouseholdUser {
  public user_id: string;
  public name: string;
  public color?: string;
  public joined_date: number;

  constructor() {
    this.user_id = '';
    this.name = '';
    this.color = '';
    this.joined_date = Date.now();
  }

  public initializeByObject(userObj: IHouseholdUser): void {
    Object.assign(this, userObj);
  }
}

export class Household implements IHousehold {
  public household_id: string;
  public name: string;
  public created_by: string;
  public created_date: number;
  public users: Array<IHouseholdUser>;
  public is_enabled: boolean;
  public invitation_code?: string;

  constructor() {
    this.household_id = '';
    this.name = '';
    this.created_by = '';
    this.created_date = Date.now();
    this.users = [];
    this.is_enabled = false;
    this.invitation_code = '';
  }

  public initializeByObject(householdObj: IHousehold): void {
    Object.assign(this, householdObj);
  }

  /**
   * Check if household has space for more users (max 10)
   */
  public hasCapacityForMoreUsers(): boolean {
    return this.users.length < 10;
  }

  /**
   * Check if user is in household
   */
  public hasUser(userId: string): boolean {
    return this.users.some((user) => user.user_id === userId);
  }

  /**
   * Add user to household if capacity available
   */
  public addUser(user: IHouseholdUser): boolean {
    if (!this.hasCapacityForMoreUsers() || this.hasUser(user.user_id)) {
      return false;
    }
    this.users.push(user);
    return true;
  }

  /**
   * Remove user from household
   */
  public removeUser(userId: string): boolean {
    const index = this.users.findIndex((user) => user.user_id === userId);
    if (index >= 0) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Generate invitation code
   */
  public generateInvitationCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.invitation_code = code;
    return code;
  }
}
