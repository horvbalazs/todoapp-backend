import { sign } from 'jsonwebtoken'
import { compareSync, hashSync } from 'bcrypt';
import { UserDocument } from './user';
import User from './user.model';
import config from '../config';

const create = async (email: string, password: string) => {
    if (!validateEmail(email)) {
        throw new Error('Invalid email');
    }

    if (await User.findOne({ email }).exec()) {
        throw new Error('Unknown error');
    }

    const hash = hashSync(password, 10);
    const user = new User({ email, hash });

    await user.save();
}

const update = async (id: string, email: string) => {
    return User.findByIdAndUpdate<UserDocument>(id, { email });
}

const getById = async (id: string) => {
    return User.findById<UserDocument>(id).exec();
}

const authenticate = async (email: string, password: string) => {
    const user = await User.findOne<UserDocument>({ email }).exec();

    if (user?.hash && compareSync(password, user.hash)) {
        const token = sign({
            sub: user.id,
        }, config.Secret, {
            expiresIn: '7d',
        });

        return {
            ...user.toJSON(),
            token,
        }
    }

    return null;
}

function validateEmail(email: string): boolean {
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(String(email).toLowerCase());
}

export default {
    create,
    update,
    getById,
    authenticate,
}