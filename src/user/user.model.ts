import { Schema, model } from 'mongoose';
import { UserDocument } from './user';

const schema = new Schema<UserDocument>({
    email: { type: Schema.Types.String, required: true, unique: true },
    hash: { type: Schema.Types.String, required: true },
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret) => {
        delete ret._id;
        delete ret.hash;
    },
});

export default model<UserDocument>('User', schema);