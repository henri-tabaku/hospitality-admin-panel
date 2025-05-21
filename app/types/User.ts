export enum Role {
    ADMIN = 'ADMIN',
    STAFF = 'STAFF'
}

export class User {
    id: number;
    email: string;
    password: string;
    role: Role;

    constructor(id: number, email: string, password: string, role: Role = Role.STAFF) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}