import {Role} from "./role";

export class User {
    constructor
    (
        id = 0,
        first_name = '',
        last_name = '',
        email = '',
        role = new Role,
        permissions = []
    ) {
        this.id = id
        this.first_name = first_name
        this.last_name = last_name
        this.email = email
        this.role = role
        this.permissions = permissions

    }
}