import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export class Auth {
    static async hashPassword(password: string) {
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds);
        return bcrypt.hash(password, salt);
    }

    static comparePassword(password: string, hashedPassword: string) {
        return bcrypt.compare(password, hashedPassword);
    }

    static sign(payload: object, key: string): string {
        return jwt.sign(payload, key);
    }


}
