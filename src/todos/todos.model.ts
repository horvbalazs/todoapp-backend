import { Schema, model } from 'mongoose';
import { TodosDocument } from './todos';

const schema = new Schema<TodosDocument>({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String },
    created: { type: Schema.Types.Date, required: true },
    due: { type: Schema.Types.Date },
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret) => {
        delete ret._id;
        delete ret.owner;
    }
});

export default model<TodosDocument>('Todos', schema);