import { expressjwt } from 'express-jwt';
import config from '../config';
import authService from '../user/user.service';
import { Request } from 'express';
import { Jwt } from 'jsonwebtoken';

function jwt() {
    return expressjwt({
        secret: config.Secret,
        algorithms: ["HS256"],
        isRevoked,
    }).unless({
        path: ["/user/login", "/user/signup"],
    });
}

async function isRevoked(_req: Request, token: Jwt | undefined) {
    const id = token?.payload.sub as string | undefined;

    if (!id) {
        return true;
    }

    const user = await authService.getById(id);

    return !user;
}

export default jwt;