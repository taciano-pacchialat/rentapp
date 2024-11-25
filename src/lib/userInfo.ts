import { User } from "@/types/user";
import Cache from "@/lib/cache";

class UserInfo {
  private static instance: UserInfo;
  private _user: User | null;

  private constructor() {
    this._user = null;
  }

  public static getInstance(): UserInfo {
    if (!UserInfo.instance) {
      UserInfo.instance = new UserInfo();
    }
    return UserInfo.instance;
  }

  public getUser(): User | null {
    return this._user;
  }

  public setUser(user: User) {
    this._user = user;
  }

  public async clearUser(): Promise<void> {
  if (this._user) {
    const cacheInstance = Cache.getInstance();
    const userApartments = await cacheInstance.getByOwner(this._user.email);
    for (const apartment of userApartments) {
      await cacheInstance.removeData(apartment.id);
    }
    this._user = null;
  }
}

  public assignUser(email: string, phone_number: string, name: string): void {
    this._user = { email, phone_number, name };
  }
}

export default UserInfo;
