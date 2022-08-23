import { Schema, model, Document } from 'mongoose';

export interface IComment extends Document {
    body: string,
    author: string,
    article: Schema.Types.ObjectId
}

const commentSchema = new Schema<IComment>({
    body: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    article: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Article'
    }
}, { timestamps: true });

export default model<IComment>('Comment', commentSchema);