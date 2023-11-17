import { Document } from 'mongoose';

export interface UserDocument extends Document {
    email: string;
    hash?: string;
}

