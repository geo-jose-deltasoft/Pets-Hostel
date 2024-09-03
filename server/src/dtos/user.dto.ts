export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    BLOCKED = 'BLOCKED'
}

export enum RoleDto {
    ADMIN = 'ADMIN',
    USER = 'USER',
    STAFF = 'STAFF'
}

export interface UserDto {
    user_name: string,
    name: string,
    email: string,
    password: string,
    mobile_number: string,
    role: RoleDto
}