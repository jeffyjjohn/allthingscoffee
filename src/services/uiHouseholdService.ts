import { Injectable } from '@angular/core';
import { UILog } from './uiLog';
import { UISettingsStorage } from './uiSettingsStorage';
import { Household, HouseholdUser } from '../classes/household/household';
import { IHouseholdUser } from '../interfaces/household/iHousehold';

@Injectable({
  providedIn: 'root',
})
export class UIHouseholdService {
  constructor(
    private readonly uiLog: UILog,
    private readonly uiSettingsStorage: UISettingsStorage,
  ) {}

  /**
   * Create a new household
   */
  public createHousehold(
    householdName: string,
    userId: string,
    userName: string,
  ): Household {
    const household = new Household();
    household.household_id = this.generateHouseholdId();
    household.name = householdName;
    household.created_by = userId;
    household.created_date = Date.now();
    household.is_enabled = true;
    household.generateInvitationCode();

    // Add creator as first user
    const creatorUser: IHouseholdUser = {
      user_id: userId,
      name: userName,
      color: this.getRandomColor(),
      joined_date: Date.now(),
    };
    household.addUser(creatorUser);

    // Save to settings
    const settings = this.uiSettingsStorage.getSettings();
    settings.household = household;
    settings.household_enabled = true;
    settings.current_user_id = userId;
    this.uiSettingsStorage.saveSettings(settings);

    this.uiLog.log('Household created: ' + householdName);
    return household;
  }

  /**
   * Join a household using invitation code
   */
  public joinHousehold(
    invitationCode: string,
    userId: string,
    userName: string,
  ): boolean {
    const settings = this.uiSettingsStorage.getSettings();

    if (!settings.household || !settings.household.invitation_code) {
      this.uiLog.error('No household found or invalid invitation code');
      return false;
    }

    if (settings.household.invitation_code !== invitationCode) {
      this.uiLog.error('Invalid invitation code');
      return false;
    }

    if (!settings.household.hasCapacityForMoreUsers()) {
      this.uiLog.error('Household is full (max 10 users)');
      return false;
    }

    if (settings.household.hasUser(userId)) {
      this.uiLog.error('User already in this household');
      return false;
    }

    const newUser: IHouseholdUser = {
      user_id: userId,
      name: userName,
      color: this.getRandomColor(),
      joined_date: Date.now(),
    };

    settings.household.addUser(newUser);
    settings.household_enabled = true;
    settings.current_user_id = userId;
    this.uiSettingsStorage.saveSettings(settings);

    this.uiLog.log('User joined household: ' + userName);
    return true;
  }

  /**
   * Leave the current household
   */
  public leaveHousehold(userId: string): boolean {
    const settings = this.uiSettingsStorage.getSettings();

    if (!settings.household) {
      return false;
    }

    const removed = settings.household.removeUser(userId);
    if (removed) {
      // If no users left, disable household
      if (settings.household.users.length === 0) {
        settings.household_enabled = false;
        settings.household = new Household();
      }
      settings.current_user_id = '';
      this.uiSettingsStorage.saveSettings(settings);
      this.uiLog.log('User left household');
      return true;
    }
    return false;
  }

  /**
   * Track bean consumption for a user
   */
  public trackBeanConsumption(
    beanId: string,
    userId: string,
    gramsConsumed: number,
  ): void {
    const settings = this.uiSettingsStorage.getSettings();
    if (!settings.household_enabled || !settings.household) {
      return;
    }

    // Find the consumption record for this user or create new one
    // This would typically be implemented in the bean storage service
    this.uiLog.log(
      `Tracked consumption: ${gramsConsumed}g of bean by user ${userId}`,
    );
  }

  /**
   * Get household users
   */
  public getHouseholdUsers(): Array<IHouseholdUser> {
    const settings = this.uiSettingsStorage.getSettings();
    if (!settings.household || !settings.household_enabled) {
      return [];
    }
    return settings.household.users;
  }

  /**
   * Get current household
   */
  public getHousehold(): Household | null {
    const settings = this.uiSettingsStorage.getSettings();
    if (!settings.household_enabled || !settings.household) {
      return null;
    }
    return settings.household;
  }

  /**
   * Check if household feature is enabled
   */
  public isHouseholdEnabled(): boolean {
    const settings = this.uiSettingsStorage.getSettings();
    return settings.household_enabled && settings.household !== null;
  }

  /**
   * Generate unique household ID
   */
  private generateHouseholdId(): string {
    return 'household_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Get random color for user
   */
  private getRandomColor(): string {
    const colors = [
      '#FF6B6B',
      '#4ECDC4',
      '#45B7D1',
      '#FFA07A',
      '#98D8C8',
      '#F7DC6F',
      '#BB8FCE',
      '#85C1E2',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
