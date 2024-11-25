import { User } from "@/types/user";

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

  public clearUser() {
    this._user = null;
  }

  public assignUser(email: string, phone_number: string, name: string): void {
    this._user = { email, phone_number, name };
  }
}

export default UserInfo;
