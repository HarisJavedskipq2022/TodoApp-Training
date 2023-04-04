export class User {
    id: string;
    email: string;
    password: string;

    private constructor(id: string, email: string, password: string) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    static userFactory(data: { id: string, email: string, password: string }): User {
        const {id, email, password} = data
        return new User(id, email, password)
    }
}