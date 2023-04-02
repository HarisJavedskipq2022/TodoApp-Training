import * as jwt from 'jsonwebtoken';

export class Jwt {
    static sign(payload: object, key: string): string {
        return jwt.sign(payload, key);
    }

    static verify(token: string, key: string) {            
        return jwt.verify(token, key);
    }
}