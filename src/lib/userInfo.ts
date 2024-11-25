class UserInfo {
    private static instance: UserInfo;
    private _usuario: number;
    private _contacto: string;

    private constructor() {
        this._usuario = 0;
        this._contacto = '0';
    }

    public static getInstance(): UserInfo {
        if (!UserInfo.instance) {
            UserInfo.instance = new UserInfo();
        }
        return UserInfo.instance;
    }

    public getUsuario(): number {
        return this._usuario;
    }

    public setUsuario(value: number) {
        this._usuario = value;
    }

    public getContacto(): string {
        return this._contacto;
    }

    public set contacto(value: string) {
        this._contacto = value;
    }
}

export default UserInfo;