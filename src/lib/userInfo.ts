class UserInfo {
    private static instance: UserInfo;
    private _usuario: string;
    private _contacto: number;

    private constructor() {
        this._usuario = '';
        this._contacto = 0;
    }

    public static getInstance(): UserInfo {
        if (!UserInfo.instance) {
            UserInfo.instance = new UserInfo();
        }
        return UserInfo.instance;
    }

    public getUsuario(): string {
        return this._usuario;
    }

    public setUsuario(value: string) {
        this._usuario = value;
    }

    public getContacto(): number {
        return this._contacto;
    }

    public set contacto(value: number) {
        this._contacto = value;
    }
}

export default UserInfo;