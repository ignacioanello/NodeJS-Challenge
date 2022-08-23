import { Schema, model, Document } from 'mongoose';

export interface IArticle extends Document {
    title: string;
    body: string;
    author: string;
}

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default model<IArticle>('Article', articleSchema);