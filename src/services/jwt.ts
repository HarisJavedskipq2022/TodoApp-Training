import * as jwt from 'jsonwebtoken';

export class Jwt {
    static sign(payload: object, key: string): string {
        return jwt.sign(payload, key);
    }
}