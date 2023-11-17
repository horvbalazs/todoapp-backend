import { Document } from 'mongoose';

export interface TodosDocument extends Document {
    owner?: string,
    title: string,
    description: string,
    created: Date,
    due?: Date,
}